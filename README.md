# BPM — Feed

A small **Expo / React Native** app that renders the BPM discovery feed. BPM
("Battements Par Minute") is a sport-focused dating app, and the product is
**dark-themed**: a deep charcoal canvas, softly elevated cards, neon activity
rings, and a one-profile-at-a-time deck. The app fetches a list of profiles and
renders each as an ordered stack of heterogeneous **cards**, handling every card
type and edge case in the sample payload.

---

## Stack & choices

| Concern       | Library                          | Note                                              |
| ------------- | -------------------------------- | ------------------------------------------------- |
| Framework     | Expo (SDK 54) + TypeScript       | React Native, iOS / Android, runs in Expo Go      |
| Data fetching | **TanStack Query** + native `fetch` | server-state cache over a tiny typed HTTP helper |
| Styling       | **StyleSheet** + design tokens   | one theme file (`src/theme/tokens.ts`)            |
| Animation     | **react-native-reanimated**      | like burst, deck transitions — on the UI thread   |
| Charts        | **react-native-svg**             | the `ActivityRings` component                     |
| Haptics       | `expo-haptics`                   | tactile feedback on like / pass                   |
| Images        | `expo-image`                     | native **thumbhash** placeholders + fade-in       |
| Icons         | `@expo/vector-icons`             | MaterialCommunityIcons                            |

### Why these choices (and why not the obvious alternatives)

- **Native `fetch`, not axios.** On React Native axios needs a custom adapter to
  behave well, ships more weight than a wrapper needs, and has had recent CVEs.
  `fetch` is built into the runtime; `src/api/client.ts` wraps it with a timeout,
  JSON parsing, cancellation, and typed errors — the one place a real app would
  set `BASE_URL` and attach auth headers.
- **StyleSheet + tokens, not NativeWind.** Styling is plain `StyleSheet.create`
  reading from a single `theme/tokens.ts` (colors, spacing, radii, typography,
  shadows). No utility-class runtime, no extra Babel/Metro transform, and no
  class-name layer that can silently mangle a component's `style` — everything is
  explicit and type-checked.
- **Reanimated, not Framer Motion.** Framer Motion is web-DOM only. The
  animations here are interaction-driven (like burst, pass fly-out) or looping
  (skeleton), so they run directly on the UI thread and stay at 60fps.
- **Expo SDK 54 — deliberate.** The public App Store Expo Go tops out at SDK 54,
  so pinning there lets a reviewer run the app by scanning a QR code — **no dev
  build, no native toolchain**. A newer SDK would force a development build and
  defeat the point of a quick technical test.

## Run it

```bash
npm install
npm start          # then scan the QR code with Expo Go, or press i / a
```

The feed loads instantly even offline: `fetchFeed()` tries the remote (Notion
signed) URL first, then falls back to the bundled sample in
`assets/mock/feed-response-example.json`.

## Architecture (separation of concerns)

Each layer has one job; UI never fetches, components never hard-code copy, and
**`components/` holds only generic, feature-agnostic UI** — anything specific to
the feed lives under `features/feed/`.

```
App.tsx                         # providers only (QueryClient, SafeArea)
src/
├─ api/                         # transport — fetch client, feed + likes endpoints
│  └─ client.ts  feed.ts  likes.ts
├─ domain/                      # meaning — types + value→label mappings
│  ├─ types.ts                  # discriminated union of card kinds
│  └─ labels.ts  infoFields.ts
├─ lib/                         # queryClient, haptics
├─ theme/tokens.ts              # the single source of truth for the look
├─ components/                  # GENERIC, reusable UI only
│  ├─ ui/         Icon · ThumbImage · ActivityRings · BpmLogo · Badge
│  └─ feedback/   ErrorState · EmptyState · PlaceholderScreen
├─ navigation/    AppShell · TabBar          # app chrome (Home / Likes / Matches / Profile)
└─ features/feed/                            # the feature — everything feed-specific
   ├─ hooks/      useFeed · useLikeCard · useProfileDeck
   ├─ screens/    FeedScreen                 # query-state → UI, owns the deck
   └─ components/ TopBar · ProfileDeck · ProfileView · FeedSkeleton
      ├─ LikeButton · PassButton · CardFrame · CardRenderer
      └─ cards/   Picture · PromptAnswer · Sport · Info · LockedPicture · Unknown
```

The key seam is **`CardRenderer`**: a single typed `switch` over the card
discriminated union. Adding a card type = add a variant to `domain/types.ts`, a
component under `cards/`, and one `case`. Nothing else changes.

## Cases addressed

Every card type and edge case from the sample payload:

| Case                        | Handling                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `picture`                   | Full-bleed photo, thumbhash placeholder → fade-in                   |
| `picture` **with prompt**   | Legible caption strip over a gradient scrim, clear of the like button |
| `prompt_answer`             | Muted question + emphasised answer; text can never sit under the heart |
| `sport_card`                | Apple-Watch **activity rings** + weekly-sessions legend (color-matched) |
| `info_card`                 | Vitals as chips; **nullable fields (`education`) are dropped**       |
| `locked_picture`            | Blurred thumbhash + lock + "Débloquer" premium gate (no `imageUrl`) |
| **Unknown type**            | Degrades gracefully (silent in prod, hint in `__DEV__`)             |
| Card **ordering**           | Always sorted by `position` in `api/feed.ts`                        |
| Unknown enum values         | `humanize()` fallback — never shows raw `snake_case`                |
| Variable card counts        | Data-driven — each profile renders whatever it has                 |
| Loading / error / empty     | Skeleton shimmer · retry · empty state                             |

## Interactions & animation

- **Like** — a white heart button on photos & prompts. Springs with an overshoot
  and fires a one-shot ring + particle **burst** in the brand pink
  (`LikeButton`, all Reanimated), plus a haptic. Wired to a TanStack Query
  mutation stub (`useLikeCard`).
- **One profile at a time** (`ProfileDeck` / `useProfileDeck`) — you see a single
  profile, scroll its cards, then act. **Pass** (sticky ✕, bottom-left) throws
  the card left; **like** throws it right; both reveal the next with a slide-in.
  A soft bottom scrim fades content beneath the floating ✕ so it always reads as
  a control on top.
- **Rewind** — the top-bar ↺ control brings back the profile you just acted on
  (disabled at the start of the deck).
- **Pull-to-refresh** restarts the deck from the top.

## Deliberately not built

Kept lean per the brief (no over-engineering): the **Likes / Matches / Profile**
tabs are honest placeholders (the feed is the exercise); **filters** and
**boost** in the top bar are presentational chrome; no navigation library (one
built screen → a single `tab` state); no global state lib (server state lives in
TanStack Query, local state is just the like toggle + the deck index).
