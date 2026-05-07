# Supercar Showcase

An interactive supercar gallery built with React 18, TypeScript 5, and Vite 5. Browse 41 of the world's most iconic performance cars, listen to real engine sounds, compare specs side by side, and save favourites to your personal garage.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Functionality](#pages--functionality)
- [State Management](#state-management)
- [Audio Engine](#audio-engine)
- [Car Catalogue](#car-catalogue)
- [Data Model](#data-model)
- [Utility Helpers](#utility-helpers)
- [Assets](#assets)

---

## Features

| Feature | Description |
| --- | --- |
| **Gallery** | 41 cars with real photos, full performance specs, and descriptions |
| **Search** | Live search across car names and brands as you type |
| **Filter by Category** | Scrollable badge row — click any category to filter the grid |
| **Filter by Brand** | Dropdown to narrow results to a single manufacturer |
| **Sort** | Sort by price (asc/desc), horsepower, top speed, or 0–60 time |
| **Engine Sounds** | Real recorded audio for combustion cars; synthesized Web Audio API tones for EVs |
| **Car Details** | Full spec sheet, performance characteristics, and similar car suggestions |
| **Compare** | Add up to 3 cars and compare them side by side; best stat in each row highlighted in gold |
| **Garage** | Heart any car to save it; persisted in `localStorage` across sessions |
| **Responsive** | Mobile-first grid: 1 → 2 → 3 → 4 columns at increasing breakpoints |
| **Accessible** | Radix UI primitives throughout; aria-labels on all interactive controls |

---

## Tech Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Framework | React + TypeScript | 18.3.1 / 5.5.3 |
| Build tool | Vite (SWC plugin) | 5.4.1 |
| Routing | React Router | v6.26.2 |
| UI components | shadcn/ui (Radix UI + Tailwind CSS) | — |
| Icons | Lucide React | 0.462.0 |
| Styling | Tailwind CSS + tailwindcss-animate | 3.4.17 |
| State | React Context API + localStorage | — |
| Audio | HTMLAudioElement + Web Audio API | — |
| Notifications | Sonner (toast) | 1.5.0 |
| Linting | ESLint 9 + React plugins | 9.9.0 |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd cars

# Install dependencies
npm install

# Start the development server (http://localhost:8080)
npm run dev
```

### Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR on port 8080 |
| `npm run build` | Type-check and produce an optimised production build in `dist/` |
| `npm run preview` | Serve the production build locally for final verification |
| `npm run lint` | Run ESLint across the entire source tree |

---

## Project Structure

```text
cars/
├── public/
│   ├── images/          # 42 car photos (.jpg, .jpeg, .webp, .avif)
│   └── audio/           # 39 engine sound clips (.mp3, .m4a)
└── src/
    ├── components/
    │   ├── CarCard.tsx   # Gallery card — image, specs, audio controls, heart/compare buttons
    │   ├── Navbar.tsx    # Fixed top bar — nav links with live badges for garage & compare counts
    │   └── ui/           # shadcn/ui primitives: Button, Badge, Card, Toast, Dropdown, …
    ├── context/
    │   └── CarContext.tsx  # Global state: favourites, compare list, search, sort, brand filter
    ├── data/
    │   └── cars.ts       # Full catalogue — 41 cars typed with the Car interface
    ├── hooks/
    │   ├── use-mobile.tsx  # Viewport breakpoint hook
    │   └── use-toast.ts    # Toast notification hook
    ├── lib/
    │   └── utils.ts      # cn(), formatPrice(), formatSpeed(), formatHP(), formatAcc()
    └── pages/
        ├── index.tsx     # Gallery page (/)
        ├── CarDetails.tsx  # Single-car detail page (/car/:id)
        ├── Compare.tsx   # Side-by-side comparison (/compare)
        ├── Garage.tsx    # Saved favourites (/garage)
        └── NotFound.tsx  # 404 fallback
```

---

## Pages & Functionality

### Gallery `/`

The main landing page displays all 41 cars in a responsive grid with live filtering.

**Controls:**

- **Search bar** — filters by name or brand in real time
- **Category badges** — horizontally scrollable row; clicking a badge shows only that category; clicking again clears it
- **Brand dropdown** — single-select; dynamically populated from the catalogue
- **Sort dropdown** — six options: Default, Price Low→High, Price High→Low, Horsepower, Top Speed, 0–60 fastest first
- **Clear Filters button** — appears when any filter is active; resets all three at once
- **"No cars found" state** — shown when the active filters return zero results, with a prompt to clear them

Each [CarCard](src/components/CarCard.tsx) shows the car photo, name, brand, category badge, price, top speed, 0–60, horsepower, and a two-line description. The card footer has **Start/Stop Engine** and **Details** buttons; hovering reveals heart (garage) and scale (compare) icon buttons in the top-right corner of the photo.

---

### Car Details `/car/:id`

A full-page view for a single car with:

- **Hero image** — 16:10 aspect ratio with a subtle zoom on hover
- **Brand & category badges**
- **Full name, price, and description**
- **Add to Garage / Add to Compare** action buttons
- **Quick stats grid** — Top Speed, 0–60, Power, Engine in four tiles
- **Performance Characteristics** — bullet list of handling and engineering notes
- **Technical Specs panel** — Transmission, Powertrain, Horsepower, Top Speed, 0–60 in a bordered table
- **Similar Vehicles** — up to 3 cars from the same category rendered as CarCards

---

### Compare `/compare`

Side-by-side table of up to 3 selected cars.

- Each car occupies a column with its photo, name, and a remove button
- Compared rows: Price, Horsepower, Top Speed, 0–60
- The **best value** in each row receives a coloured highlight badge ("Most Powerful", "Highest Top Speed", "Quickest")
- An empty slot prompts the user to go back to the gallery and add another car
- If no cars are selected, a full empty state is shown with a link to the gallery

---

### Garage `/garage`

Personal collection page showing only the cars the user has hearted.

- Same responsive grid and audio playback as the gallery
- Header shows a live count of saved vehicles
- Empty state shown when no favourites exist yet, with a link back to the gallery
- Favourites persist in `localStorage` under the key `supercar-showcase-favorites` — they survive page refreshes and browser restarts

---

### Navbar

Fixed top navigation bar with:

- **SupercarShowcase** logo (Car icon + text)
- **Gallery**, **Garage**, **Compare** links
- Live red badge on Garage showing the number of saved cars
- Live blue badge on Compare showing how many cars are queued for comparison
- Active route highlighted with a secondary button style
- Backdrop blur + semi-transparent background so content scrolls underneath cleanly

---

## State Management

All shared state lives in [CarContext](src/context/CarContext.tsx) and is consumed via the `useCar()` hook.

| State | Type | Persisted | Description |
| --- | --- | --- | --- |
| `favorites` | `string[]` | `localStorage` | Array of car IDs the user has hearted |
| `compareList` | `Car[]` | In-memory | Up to 3 cars selected for comparison |
| `searchQuery` | `string` | In-memory | Current text in the search bar |
| `sortBy` | `string` | In-memory | Active sort key |
| `selectedBrand` | `string` | In-memory | Active brand filter value |

| Action | Description |
| --- | --- |
| `toggleFavorite(id, name)` | Adds or removes a car from the garage; fires a toast notification either way |
| `addToCompare(car)` | Adds a car to the compare list; shows a toast and enforces the 3-car maximum |
| `removeFromCompare(id)` | Removes a single car from the compare list |
| `setSearchQuery(query)` | Updates live search text |
| `setSortBy(sort)` | Updates the active sort option |
| `setSelectedBrand(brand)` | Updates the active brand filter |

---

## Audio Engine

Each car card has a **Start/Stop Engine** toggle. Only one car can play at a time — starting a new one automatically stops the current one.

### Real audio

All combustion cars reference an `.mp3` or `.m4a` file under `public/audio/`. The file is played via a standard `HTMLAudioElement` at 70% volume.

### Synthesized fallback

If the audio file is missing, blocked, or the car is electric, the app falls back to the Web Audio API using a single shared `AudioContext`:

| Engine type | Oscillator | Base frequency | Behaviour |
| --- | --- | --- | --- |
| Electric / Hybrid-EV | `sine` | 180 Hz | Ramps to 2 400 Hz over 2.2 s — mimics an electric motor whine |
| V12 | `sawtooth` | 110 Hz | Ramps to ×2.2 over 1.5 s |
| V10 | `sawtooth` | 125 Hz | Ramps to ×2.2 over 1.5 s |
| V8 | `sawtooth` | 140 Hz | Ramps to ×2.2 over 1.5 s |
| V6 / other | `sawtooth` | 160 Hz | Ramps to ×2.2 over 1.5 s |

A toast notification is shown whenever the fallback path is triggered so the user knows why they're hearing a synthesized sound.

---

## Car Catalogue

41 cars across 15+ brands:

| Brand | Models |
| --- | --- |
| Lamborghini | Aventador SVJ, Huracán EVO, Gallardo Superleggera, Murciélago, Reventón, Sián FKP 37 |
| Ferrari | SF90 Stradale, F8 Tributo, 488 Pista, LaFerrari, 812 Superfast, Enzo |
| McLaren | 720S, P1, Senna |
| Porsche | 911 GT3, Carrera GT, 918 Spyder |
| BMW | M8 Competition, M4 Competition |
| Aston Martin | DB11, DBS Superleggera |
| Mercedes-AMG | GT R, ONE |
| Bugatti | Chiron |
| Koenigsegg | Jesko |
| Pagani | Huayra |
| Rimac | Nevera |
| Lotus | Evija |
| Dodge | Viper ACR, Challenger SRT Hellcat |
| Nissan | GT-R NISMO |
| Ford | GT, Mustang Shelby GT500 |
| Chevrolet | Corvette C8 |
| Acura | NSX |
| Lexus | LFA |
| Cadillac | CTS-V |
| Toyota | GR Supra |
| Subaru | WRX STI |
| Mazda | RX-7 FD |

---

## Data Model

```ts
export interface Car {
  id: string;           // URL-safe slug, e.g. "lamborghini-aventador-svj"
  name: string;         // Display name, e.g. "Aventador SVJ"
  brand: string;        // Manufacturer name
  category: string;     // e.g. "Hypercar", "Supercar", "Sports Car"
  image: string;        // Path under /images/, e.g. "/images/aventador.webp"
  price: number;        // USD — formatted by formatPrice()
  topSpeed: number;     // mph — formatted by formatSpeed()
  acceleration: number; // seconds 0–60 mph — formatted by formatAcc()
  horsepower: number;   // HP — formatted by formatHP()
  engine: string;       // e.g. "6.5L V12 Naturally Aspirated"
  transmission: string; // e.g. "7-speed ISR automated manual"
  description: string;  // 2–3 sentence overview shown in card and detail page
  characteristics: string[]; // Bullet points shown in the detail page performance section
  audioFile: string;    // Path under /audio/, e.g. "/audio/aventador.mp3"
}
```

All numeric fields (`price`, `topSpeed`, `acceleration`, `horsepower`) are stored as plain numbers. Display formatting is handled exclusively by the helper functions in `src/lib/utils.ts`.

---

## Utility Helpers

All helpers are exported from [src/lib/utils.ts](src/lib/utils.ts).

| Function | Input | Example output |
| --- | --- | --- |
| `cn(...inputs)` | Class strings / objects | Merges and deduplicates Tailwind classes |
| `formatPrice(price)` | `number` | `"$3,900,000"` |
| `formatSpeed(speed)` | `number` (mph) | `"217 mph"` |
| `formatHP(hp)` | `number` | `"1,000 HP"` |
| `formatAcc(acc)` | `number` (seconds) | `"2.9s (0-60mph)"` |

---

## Assets

### Images — `public/images/`

42 files covering all 41 cars (one car has two variants). Formats used:

| Format | Usage |
| --- | --- |
| `.webp` | Primary format for most cars — best compression/quality ratio |
| `.jpg` / `.jpeg` | Fallback format for a handful of cars |
| `.avif` | Next-generation format used for one car |

### Audio — `public/audio/`

39 engine sound clips. Formats used:

| Format | Usage |
| --- | --- |
| `.mp3` | Primary format for the majority of cars |
| `.m4a` | Used for a small number of cars |

If an audio file is missing at runtime, the app silently falls back to the synthesized Web Audio API sound and shows a toast notification — no errors are thrown.
