# BPM Feed — Project Conversation Log

A chronological record of the exchange that produced this app: a sport-focused
dating feed built with Expo / React Native. Each section is one turn — the
user's request (quoted verbatim) followed by a summary of what was done and the
key decisions made.

---

## 0. Context & inputs

The project started from two inputs:

- A Notion case page: `https://bpm-app.notion.site/bpm-feed-case`
- A sample feed payload: `feed-response-example.json`

The Notion page is a client-rendered SPA, so its prose couldn't be extracted;
the JSON payload came through in full and became the effective specification. A
web search confirmed the domain: **BPM is a sport & dating app**. The JSON
describes a feed of **profiles**, each made of an ordered list of **cards** of
several types: `picture`, `prompt_answer`, `sport_card`, `info_card`, and
`locked_picture`.

---

## 1. Build the app

> From this context […Notion links…], you have to create a new expo application
> from here and address each case. Build the stuff by thinking SOC (separation
> of concern) the code must be remaining clean and easy to read. Don't write
> over engineered stuff (like over use of useEffect) don't redo the wheel (use
> axios, tanstack query for fetching etc) for style you can use tailwind, for
> animation you can use framer motion.

**Done:**

- Fetched the JSON payload (Notion page was an un-scrapable SPA).
- Scaffolded a blank-TypeScript Expo app (SDK 57 at the time), installed
  dependencies via `expo install` / npm.
- Established a **separation-of-concerns architecture**:
  - `api/` — axios client + feed/likes endpoints
  - `domain/` — discriminated-union card types + value→label/icon maps
  - `features/feed/` — hooks (data access), screen, components, card renderers
  - `components/` — reusable UI + feedback states
- Implemented every card type + edge cases (nullable fields dropped, unknown
  card types degrade gracefully, cards sorted by `position`, unknown enum values
  humanized).
- Loading skeleton / error / empty states; a like mutation stub.

**Key substitutions (explained to the user):**

- **Framer Motion → Moti.** Framer Motion targets the web DOM; Moti is its
  framer-motion-style API for React Native (later replaced again — see §7).
- **Tailwind → NativeWind.** The Tailwind runtime is web-only; NativeWind is
  Tailwind for RN (same class names, same config).
- Bundled the sample JSON locally as an offline fallback for `fetchFeed()`.

Validated with `tsc --noEmit` + a production `expo export` bundle.

---

## 2. Run it on iOS

> run it in the ios simulator

**Blocker found:** Xcode 26.5 was installed but **no iOS simulator runtime**
was present (`simctl list runtimes` empty). Rather than kick off a multi-GB
runtime download, the user was asked how to proceed and chose **Physical iPhone
via Expo Go**. The dev server was started and a QR code generated.

---

## 3. The SDK compatibility saga

Expo Go rejected the project: **"Project is incompatible with this version of
Expo Go."** Investigation of npm dist-tags showed SDK tags only up to `sdk-56`
(none for 57), i.e. `create-expo-app@latest` had scaffolded a **too-new SDK**
whose Expo Go binary wasn't in the App Store yet.

> Le soucis c'est qu'il faut utiliser un dev client expo […] expo go est la
> derniere version sur le store donc aucun soucis a ce niveau.
> Expo Go l'application publiée sur les store ne supporte pas SDK 56 Max 54

**Resolution:** clarified that **no dev client was needed** — the app uses only
modules bundled in Expo Go, so the failure was purely the SDK number. Downgraded
**SDK 57 → 56 → 54** (store Expo Go tops out at 54), realigning native deps with
`expo install --fix` (and `legacy-peer-deps` to sidestep a react-native-web peer
conflict). The app then **loaded successfully on the device**. Saved a memory
noting this machine's Expo Go maxes at SDK 54.

---

## 4. Improve the animations

> Ameliorons les animations deja, l'animation passe est inexistante, je ne vois
> pas dans l'app comment passer une personne. Fais une animation clean en terme
> d'UX […] Pour l'animation du like egalement, on va l'ameliorer et la rendre
> moins simpliste.

Began adding a discoverable pass affordance + a richer like animation, and
installed `expo-haptics` for tactile feedback.

---

## 5. Reanimated + the FlashList challenge

> On va remplacer framer motion par react-native-reanimated et je te challenge
> sur la pertinence et l'utilisation de @shopify/flash-list qui est une lib de
> rendu de list plutot performante.

**Done:**

- **Removed Moti entirely**, rewrote all animation in raw
  **react-native-reanimated** (like burst with ring + particles, pass fly-out,
  skeleton shimmer).
- **Adopted FlashList** — with an honest assessment: overkill for the 10-item
  sample, but the right call for a paginated feed. Made the pass animation
  self-contained per cell so recycling wouldn't interfere. (Later reversed — see
  §11.)
- Added haptics on like/pass.

---

## 6. Hinge-style visual redesign

> Visuellement on veut un Hinge like, fait une refonte graphique afin de s'en
> approcher au maximum

**Done:** cream canvas, white cards on soft shadows, **eggplant accent**
(`#5B2E8A`), editorial name typography, big airy prompt answers, vitals as
chips, gradient photo scrims (`expo-linear-gradient`), and the signature white
heart button.

---

## 7. Sticky pass + like placement

> Les likes ne sont pas bien places, et le bouton passe doit etre en sticky
> comme sur Hinge sur le cote gauche

**Done:** removed the per-card/header pass buttons and added **one sticky white
✕ pinned bottom-left** that acts on the profile currently in view (tracked via
FlashList viewability + a ref registry of each card's `pass()`), and tightened
the like button placement.

---

## 8. Button consistency + overflow

> Les boutons passe et like ne sont pas consistant en terme de taille. le bouton
> like est toujours trop bas, il sort de son container et empiete sur les
> containers du dessous

**Done:** introduced a shared `ACTION_BUTTON_SIZE` token and moved the like
button **fully inside** each card's bottom-right corner so it no longer spills
onto the card below.

---

## 9. Why a feed of everyone? → one at a time

> Autre probleme on a un feed pour tout le monde pourquoi ? Ca devrait etre
> comme sur les autres app de dating, au clique sur passe, tu switch vers la
> personne suivante, or la on a toutes les personnes sur la meme liste. Pourquoi
> avoir fait ce type rendu ?

**Acknowledged as correct.** The vertical feed rendered _everyone_ in one list —
wrong for a dating app. Refactored to a **one-profile-at-a-time deck**
(`ProfileDeck` + `useProfileDeck`): the current profile scrolls vertically;
**pass** throws the card left, **like** throws it right, both revealing the next
profile. This also made **FlashList unnecessary** (no long list to virtualize),
so it was **removed** — resolving the earlier challenge in §5.

---

## 10. Pass button fixes

> Le bouton passe n'est toujours pas de la meme taille que le bouton like

> Le bouton passe n'a pas le radius blanc comme le bouton like

**Root cause:** NativeWind mangled the pass button's `style`-as-function
`Pressable` (dropping width + white fill). **Fix:** both buttons now size and
shape from one explicit `circleStyle()` helper using a static style array — off
the NativeWind path — guaranteeing pixel-identical white circles.

---

## 11. Sport card → activity rings

> top est-ce qu'on peut ameliorer le rendu du graphique sur la carte sport ?
> […] Crée un composant de « concentric progress rings » (style Apple Watch
> activity rings) en SVG. Trois anneaux imbriqués et centrés […] Extrémités
> arrondies […] Départ à 12h, sens horaire. Palette néon sur fond noir […] avec
> un léger effet de glow.

**Done:** built a reusable **`ActivityRings`** SVG component (`react-native-svg`)
— concentric arcs, 12 o'clock start, clockwise, rounded caps, dark tracks, and a
faked glow (layered low-opacity strokes, no fragile SVG filters). One ring per
sport, filled by training frequency, with a color-matched legend.

---

## 12. Light-theme adaptation

> on a un fond noir sur le container parent du diagram alors qu'on est en light

> le label intensif devient inutile du coup

**Done:** removed the black widget background, adapted the rings to the light
surface (vivid-but-readable palette, light track, subtler glow, dark legend
text), and **removed the redundant "Intensif" tag** — the rings already encode
intensity.

---

## 13. Palette + glow polish

> les couleurs des rings sont un peu trop saturees

> le glow est trop prononce sinon c'est pas mal

**Done:** muted the ring palette (green → violet → rose, the violet nodding to
the eggplant brand) and softened the glow to a whisper (5% / 10% halo opacities).

---

## 14. Export this conversation

> cree un dossier a la racine du projet et exporte notre echange depuis le debut
> du projet au format markdown a l'interieur de ce dernier. Une fois fait,
> commit le fichier et push sur master (branche actuelle)

This document, committed and pushed to `master`.

---

## Final stack

| Concern       | Choice                                                   |
| ------------- | -------------------------------------------------------- |
| Framework     | Expo SDK 54 + TypeScript (React Native, runs in Expo Go) |
| Data fetching | TanStack Query + native `fetch`                          |
| Styling       | StyleSheet + design tokens (`src/theme/tokens.ts`)       |
| Animation     | react-native-reanimated                                  |
| Charts        | react-native-svg (`ActivityRings`)                       |
| Haptics       | expo-haptics                                             |
| Images        | expo-image (thumbhash placeholders)                      |
| Gradients     | expo-linear-gradient                                     |
| Icons         | @expo/vector-icons                                       |

The feed is presented **one profile at a time**: scroll a profile's cards, like
(♥, advances right) or pass (✕ sticky bottom-left, advances left).

---

## 15. Review round — dark redesign + stack cleanup

> Retour premier test technique […] L'objectif de ce test est de tester ton œil
> et actuellement l'output n'est pas du tout au niveau. […] l'application de test
> doit ressembler comme 2 gouttes d'eau à l'application BPM.

The reviewer's "résultat attendu" showed BPM's real **dark** UI; what had shipped
was a light Hinge-style build with a visible bug — the sticky ✕ overlapping (and
appearing to clip) prompt text. Plus code notes: _why Expo 54, why axios,
NativeWind isn't great, and keep `features/` discipline (feed components had
leaked into `components/`)._

**Done — every point addressed:**

- **Dark redesign to match BPM.** Charcoal canvas, elevated cards, a top app bar
  (profile name + filters / rewind / boost), neon activity rings under a
  "Séances / semaine" legend, a bottom tab bar (Home / Likes / Matches /
  Profile), and the BPM heartbeat mark. Status bar and app theme set to dark.
- **The ✕ bug, fixed structurally.** On dark the pass button is a solid, shadowed
  control; a bottom **scrim** fades scrolling content beneath it so the ✕ always
  reads as "on top." Prompt/photo text now reserves the button's corner, so it
  can never be clipped or overlapped, however long it runs.
- **axios → native `fetch`.** A tiny typed client (timeout, cancellation, JSON,
  typed errors). Removes the RN-adapter caveat and the axios CVE.
- **NativeWind → StyleSheet + tokens.** No utility-class runtime or extra
  Babel/Metro transform — and it retires the class of bug that previously mangled
  the buttons' `style`.
- **`features/` discipline.** `components/` is now generic-only; `LikeButton`,
  `PassButton`, `FeedSkeleton`, `TopBar` moved under `features/feed/`. Dead code
  removed (`Tag`, the `sportIcon` map). New shell chrome lives in `navigation/`.
- **Expo 54 justified, not just inherited:** it's what keeps the app runnable in
  the public Expo Go with no dev build.
- **Rewind** added (top-bar ↺) to undo the last pass/like.

Validated with `tsc --noEmit` and a production `expo export` (1189 modules, clean).
