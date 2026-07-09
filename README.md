# BPM — Feed

A small **Expo / React Native** app that renders the BPM discovery feed (a
sport-focused dating app). It fetches a list of profiles and renders each one as
an ordered stack of heterogeneous **cards**, handling every card type and edge
case in the sample payload.

<p align="center"><em>Discover profiles · photos · prompts · sports · vitals · locked photos</em></p>

---

## Stack & choices

| Concern      | Library                     | Note |
|--------------|-----------------------------|------|
| Framework    | Expo (SDK 54) + TypeScript  | React Native, iOS / Android, runs in Expo Go |
| Data fetching| **TanStack Query** + **axios** | as requested |
| Styling      | **NativeWind** (Tailwind for RN) | `className` on native components |
| Animation    | **react-native-reanimated** | springs, interpolation, deck transitions — runs on the UI thread |
| Haptics      | `expo-haptics`              | tactile feedback on like / pass |
| Images       | `expo-image`                | native **thumbhash** placeholders + fade-in |
| Icons        | `@expo/vector-icons`        | MaterialCommunityIcons |

> **Why NativeWind, not Tailwind directly?** The Tailwind runtime targets the
> web DOM and doesn't run on React Native. **NativeWind** _is_ Tailwind for RN —
> same class names, same config, native rendering.
>
> **Why Reanimated, not Framer Motion?** Framer Motion is web-DOM only. The
> animations here are interaction-driven (like burst, pass fly-out) or looping
> (skeleton), so they're written directly in **Reanimated** — everything runs on
> the UI thread and stays at 60fps even while JS is busy.
>
> **Why SDK 54?** The public App Store Expo Go tops out at SDK 54, so pinning
> there keeps the app runnable in Expo Go with no dev build. Newer SDKs would
> require a development build.

## Run it

```bash
npm install
npx expo start          # then press i (iOS), a (Android), or scan with Expo Go
```

The feed loads instantly even offline: `fetchFeed()` tries the remote (Notion
signed) URL first, then falls back to the bundled sample in
`assets/mock/feed-response-example.json`.

## Architecture (separation of concerns)

Each layer has one job; UI never fetches, and components never hard-code copy.

```
App.tsx                         # providers only (QueryClient, SafeArea)
src/
├─ api/                         # transport — axios client, feed + likes endpoints
│  ├─ client.ts  feed.ts  likes.ts
├─ domain/                      # meaning — types + value→label/icon mappings
│  ├─ types.ts                  # discriminated union of card kinds
│  ├─ labels.ts  infoFields.ts  sports.ts
├─ lib/           (queryClient, haptics)
├─ theme/tokens.ts
├─ components/                  # generic, reusable UI
│  ├─ ui/         (Icon, ThumbImage, Tag, LikeButton, PassButton)
│  └─ feedback/   (FeedSkeleton, ErrorState, EmptyState)
└─ features/feed/               # the feature
   ├─ hooks/      (useFeed, useLikeCard, useProfileDeck)
   ├─ screens/FeedScreen.tsx                 # query-state → UI
   └─ components/
      ├─ ProfileDeck → ProfileView → ProfileHeader + CardRenderer   # one at a time
      └─ CardRenderer → cards/{Picture,PromptAnswer,Sport,Info,LockedPicture,Unknown}
```

The key seam is **`CardRenderer`**: a single typed `switch` over the card
discriminated union. Adding a card type = add a variant to `domain/types.ts`,
a component under `cards/`, and one `case`. Nothing else changes.

## Cases addressed

Every card type and edge case from the sample payload:

| Case | Handling |
|------|----------|
| `picture` | Full-bleed photo, thumbhash placeholder → fade-in |
| `picture` **with prompt** | Legible caption strip overlaid on the image |
| `prompt_answer` | Category chip + question + emphasised answer |
| `sport_card` | Per-sport icon, label, and a 3-bar intensity meter |
| `info_card` | Two-column vitals grid; **nullable fields (`education`) are dropped** |
| `locked_picture` | Blurred thumbhash + lock + "Débloquer" premium gate (no `imageUrl`) |
| **Unknown type** | Degrades gracefully (silent in prod, hint in `__DEV__`) |
| Card **ordering** | Always sorted by `position` in `api/feed.ts` |
| Unknown enum values | `humanize()` fallback — never shows raw `snake_case` |
| Variable card counts | Data-driven — each profile renders whatever it has |
| Loading / error / empty | Skeleton shimmer · retry · empty state |

## Interactions & animation

- **Like** — a Hinge-style heart on photos & prompts. Springs with an overshoot
  and fires a one-shot ring + particle **burst** (`LikeButton`, all Reanimated),
  plus a haptic. Wired to a TanStack Query mutation stub (`useLikeCard`).
- **One profile at a time** (`ProfileDeck` / `useProfileDeck`) — like every
  dating app, you see a single profile, scroll its cards vertically, then act.
  **Pass** (sticky ✕, bottom-left) throws the card off to the left; **like**
  throws it to the right; both reveal the next profile with a slide-in. Running
  out shows a "seen everyone" state with reset.
- **Pull-to-refresh** restarts the deck from the top.

> **A note on FlashList:** an earlier version rendered every profile in one
> `@shopify/flash-list`. The one-at-a-time deck makes that moot — there's no long
> list to virtualize, only the current profile's handful of cards in a
> `ScrollView` — so the dependency was removed.

## Deliberately not built

Kept lean per the brief (no over-engineering): no navigation stack (single
screen), no global state lib (server state lives in TanStack Query; local state
is just the like toggle + the set of passed profiles), and no `useEffect` for
data flow (the one effect is the skeleton's shimmer loop).
