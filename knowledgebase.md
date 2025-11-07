# ConTraSt/UnconTraSt Project Knowledge Base

## Project Overview

This is a sophisticated dual-mode React application serving two related scientific databases:
- **ConTraSt**: Consciousness Theories Database
- **UnconTraSt**: Unconscious Processing Database

The project maintains two separate applications from a single codebase, sharing components and infrastructure while maintaining distinct entry points, routing, and content.

**Key Stats:**
- 162 source files
- ~26,681 lines of code
- React 18.2.0 + Vite 4.0.0
- Two production deployments from one codebase

---

## Critical Architecture Concepts

### 1. Dual-Mode Build System

**THIS IS THE MOST IMPORTANT CONCEPT IN THE PROJECT.**

The application builds into **two completely separate deployments** from the same source code:

```
Single Codebase → Two Separate Builds
                ↓
         ┌──────┴──────┐
         ↓             ↓
    ConTraSt      UnconTraSt
 (dist-contrast) (dist-uncontrast)
```

**How It Works:**

1. **Build Time**: Vite modes (`contrast_dev`, `contrast_prod`, `uncontrast_dev`, `uncontrast_prod`) determine which HTML entry point to use
2. **Entry Points**: Different HTML files point to different JavaScript entry points
3. **Runtime Detection**: `Site.type` class reads `VITE_MODE_NAME` environment variable
4. **Conditional Rendering**: Components adapt based on `Site.type`

**Critical Rule:** Mode switching happens at BUILD time, NOT runtime. You cannot switch between ConTraSt and UnconTraSt in the browser.

### 2. Site Type Detection Pattern

**Core Logic** (`src/config/siteType.js`):

```javascript
import { Site } from "../config/siteType";

// In any component:
const isUncontrast = Site.type === "uncontrast";

// Conditional rendering:
return (
  <img src={isUncontrast ? UnconLogo : Logo} />
);
```

**Usage in Components:**
- Logo switching (Navbar, Footer)
- Navigation filtering
- Content display
- Graph visibility
- Feature availability

### 3. Directory Structure Logic

```
src/
├── contrast/              # ConTraSt-ONLY code
│   ├── main-contrast.jsx  # Entry point
│   ├── AppContrast.jsx    # Root component
│   └── pages/             # ConTraSt pages (20+)
│
├── uncontrast/            # UnconTraSt-ONLY code
│   ├── main-uncontrast.jsx
│   ├── AppUncontrast.jsx
│   └── pages/             # UnconTraSt pages (14+)
│
├── sharedComponents/      # SHARED across both
├── apiHooks/              # SHARED across both
├── Utils/                 # SHARED across both
└── assets/                # SHARED across both
```

**Rule:** If code needs to work in both apps, it MUST go in shared directories.

---

## Technology Stack

### Core
- **React 18.2.0** - UI framework
- **Vite 4.0.0** - Build tool (with custom multi-mode configuration)
- **React Router Dom 6.4.5** - Client-side routing
- **Tailwind CSS 3.2.4** - Utility-first styling
- **Flowbite/Flowbite-React** - Component library

### State Management
- **Valtio 1.10.5** - Global client state (auth, user, path)
- **React Query 4.19.1** - Server state management
  - Cache: 60 minutes
  - Auto-refetch: 10 minutes
  - No refetch on mount/focus

### Data & API
- **Axios 1.2.1** - HTTP client with interceptors
- **jwt-decode** - Token parsing
- **js-cookie** - Cookie management

### Forms & Validation
- **Formik 2.4.1** - Form management
- **Yup 1.2.0** - Schema validation

### Visualization
- **Plotly.js** - Interactive charts (primary)
- **Recharts 2.2.0** - Alternative charting

### Monitoring
- **Sentry** - Error tracking & performance monitoring

### Testing
- **Playwright 1.48.2** - E2E testing in `/e2e`

---

## Key Patterns & Conventions

### Component Patterns

**1. Feature Folder Structure**
```
pages/FeatureName/
  FeatureName.jsx        # Main component
  SubComponent1.jsx      # Feature-specific
  SubComponent2.jsx
```

**2. Shared Reusables**
All UI primitives live in `sharedComponents/Reusble.jsx`:
- `<Button>`, `<ButtonReversed>`
- `<Text>`, `<Spacer>`
- `<Toggle>`, etc.

**3. Mobile Detection**
```javascript
import { isMoblile } from "../Utils/functions";

if (isMoblile) return <MobileScreen />;
```

**4. Lazy Loading**
```javascript
const WorldMap = React.lazy(() => import("./pages/WorldMap/WorldMap"));
```
Used for: WorldMap, UploadNewPaper

### Styling Patterns

**Tailwind-First Approach:**
```jsx
<div className="flex justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-3xl">
```

**Responsive Design:**
```jsx
className="flex flex-col sm:flex-row gap-2 sm:gap-4"
```

**Custom Colors:**
Extended palette in `tailwind.config.cjs`: blue, azure, grayHeavy, grayReg, yellow, orange, pink, lilac, purple, navyBlue, darkTeal, teal, lightGreen, flourishRed, revoltingGreen, someRed

**Safelist Pattern:**
Dynamic color classes MUST be safelisted to prevent purging:
```javascript
safelist: [
  { pattern: /bg-(blue|azure|grayHeavy)/ },
  // etc.
]
```

### API Patterns

**1. API Hooks Location:** `src/apiHooks/`

**2. Standard Hook Pattern:**
```javascript
export default async function getResource() {
  return await queryApi({
    url: "resource/",
    method: "GET",
  });
}
```

**3. Usage in Components:**
```javascript
const { data, isSuccess } = useQuery(
  ['cache-key'],
  apiFunction,
  { enabled: condition }
);
```

**4. Axios Configuration:**
- Base URL: `import.meta.env.VITE_API_URL`
- Interceptor adds Bearer token
- Network errors trigger toast notifications

### Authentication Pattern

**Token Flow:**
1. Login stores JWT in cookies (`js-cookie`)
2. `useAuth` hook validates token on app load
3. `ProtectedRoute` guards authenticated routes
4. Axios interceptor adds token to requests

**Global State (Valtio):**
```javascript
state = {
  auth: null,           // JWT token
  user: {},             // User data
  path: "/",            // Current path
  tempUsername: null,
  serverError: false
}
```

### Graph/Visualization Pattern

**Metadata-Driven Routes** (`Utils/GraphsDetails.jsx`):
```javascript
{
  text: "Display Name",
  tooltip: "Description",
  icon: <Component />,
  color: "tailwindColor",
  route: "/path",
  figureLine: "Explanation",
  siteToDisplay: "contrast" | "uncontrast" | "both"
}
```

**Filtering:**
```javascript
const graphs = isUncontrast
  ? graphsHeaders.filter(x => x.siteToDisplay === "uncontrast" || x.siteToDisplay === "both")
  : graphsHeaders.filter(x => x.siteToDisplay === "contrast" || x.siteToDisplay === "both");
```

### Import/Export Patterns

**Component Exports:**
```javascript
export default function ComponentName() { }
```

**Utility Exports:**
```javascript
export function functionName() { }
export const constantName = value;
```

**SVG as Components:**
```javascript
import { ReactComponent as IconName } from "../assets/icons/icon.svg";
```

**Asset Imports:**
```javascript
import Logo from "../assets/logoes/logo.png";
```

---

## Naming Conventions

### Files
- Components: PascalCase (`HomePage.jsx`, `Navbar.jsx`)
- Utilities: camelCase (`api.jsx`, `tokenHandler.jsx`)
- Config: camelCase (`siteType.js`)

### Code
- Components: PascalCase
- Functions: camelCase
- Hooks: camelCase with "use" prefix
- Constants: camelCase or SCREAMING_SNAKE_CASE

### CSS
- Tailwind utilities (preferred)
- Custom classes: kebab-case

---

## Build System Details

### Environment Variables

**Required:**
- `VITE_API_URL` - Backend API endpoint
- `VITE_MODE_NAME` - Site identifier (contrast_dev, contrast_prod, uncontrast_dev, uncontrast_prod)

**Environment Files:**
```
.env.contrast_dev        # Dev API + contrast mode
.env.contrast_prod       # Prod API + contrast mode
.env.uncontrast_dev      # Dev API + uncontrast mode
.env.uncontrast_prod     # Prod API + uncontrast mode
```

### Build Scripts (package.json)

```json
{
  "dev:contrast": "vite --mode contrast_dev",
  "dev:uncontrast": "vite --mode uncontrast_dev",
  "build:contrast": "vite build --mode contrast_prod",
  "build:uncontrast": "vite build --mode uncontrast_prod"
}
```

### Build Output Structure

```
dist-contrast/          # ConTraSt production build
  ├── index.html
  └── assets/

dist-uncontrast/        # UnconTraSt production build
  ├── index.html
  └── assets/
```

### Vite Configuration Strategy

1. **Mode-based HTML Selection**: Custom plugin transforms `index.html` based on mode
2. **Separate Entry Points**: `index-contrast.html` → `main-contrast.jsx`, `index-uncontrast.html` → `main-uncontrast.jsx`
3. **Post-build Renaming**: Scripts rename `index-{mode}.html` to `index.html`

---

## Routing Structure

### ConTraSt Routes (22 total)

**Public:**
- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/terms-of-use` - Terms
- `/modes-of-governance` - Governance
- `/login`, `/register` - Auth

**Protected (auth required):**
- `/profile` - User profile (lazy)
- `/upload-new-paper` - Paper submission (lazy)

**Visualizations:**
- `/parameter-distribution-free-queries`
- `/parameter-distribution-bar`
- `/parameter-distribution-pie`
- `/theory_grand_overview_bar`
- `/theory-driven`
- `/trends-over-time`
- `/theories-comparison`
- `/anatomical-findings`
- `/frequencies`
- `/journals`
- `/timings`
- `/consciousness-world-map` (lazy)

### UnconTraSt Routes (18 total)

Similar structure with specialized routes:
- `/grand_overview_pie`
- `/experiments-comparison`
- `/distribution-of-experiments-across-parameters`
- `/unconsciousness-world-map` (lazy)

### Routing Patterns

1. **Mobile Detection**: Most visualization routes check `isMoblile` and render `<MobileScreen />` for mobile
2. **Lazy Loading**: Heavy components (WorldMap, UploadNewPaper) use `React.lazy()`
3. **Protected Routes**: `<ProtectedRoute>` wrapper checks `state.auth`
4. **Site-Specific Pages**: Each site has parallel page structure in their folders

---

## Component Hierarchy

### Entry Flow

```
index-{mode}.html
  ↓
main-{mode}.jsx
  ↓
App{Mode}.jsx
  ↓
{Mode}Screens.jsx (Routes)
  ↓
Page Components
```

### Shared Component Usage

**Navbar** (`sharedComponents/Navbar.jsx`):
- Used in both apps
- Adapts logo based on `Site.type`
- Filters navigation items by `siteToDisplay`
- Shows auth-specific items

**Footer** (`sharedComponents/Footer.jsx`):
- Used in both apps
- Site-aware logo switching
- Partner logos (conditional display)

**PageTemplate** (`sharedComponents/PageTemplate.jsx`):
- Grid layout template
- Used by most pages
- Consistent header/body structure

**MobileScreen** (`sharedComponents/MobileScreen/MobileScreen.jsx`):
- Fallback for mobile visualization pages
- Prompts desktop access

---

## State Management Details

### Global State (Valtio)

**Location:** `src/state.jsx`

**Structure:**
```javascript
{
  auth: null,           // JWT token string
  path: "/",            // Current route path
  user: {},             // User object { email, username, etc. }
  tempUsername: null,   // Temp storage during registration
  serverError: false    // Global error flag
}
```

**Usage:**
```javascript
import { state } from "../state";
import { useSnapshot } from "valtio";

// Read state:
const snap = useSnapshot(state);
console.log(snap.user);

// Mutate state:
state.auth = token;
state.user = userData;
```

### Server State (React Query)

**Configuration:**
```javascript
{
  staleTime: 60 * 60000,        // 60 minutes
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchInterval: 10 * 60000   // 10 minutes
}
```

**35+ API Hooks Including:**
- `useAuth.jsx` - Auth validation
- `getFreeQueries.jsx` - Custom queries
- `getStudies.jsx` - Study data
- `createExperiment.jsx` - Experiment creation
- `getConfiguration.jsx` - Site config

---

## Common Development Scenarios

### Adding a New Page

1. **Determine Site Scope:**
   - Both sites? → Create in both `contrast/pages/` and `uncontrast/pages/`
   - One site? → Create in specific site folder

2. **Create Component:**
   ```javascript
   // src/{mode}/pages/NewPage/NewPage.jsx
   export default function NewPage() {
     const isUncontrast = Site.type === "uncontrast";
     // Implementation
   }
   ```

3. **Add Route:**
   - ConTraSt: Edit `src/contrast/ContrastScreens.jsx`
   - UnconTraSt: Edit `src/uncontrast/UncontrastScreen.jsx`

4. **Add Navigation (if needed):**
   - Edit `src/Utils/GraphsDetails.jsx`
   - Add entry with `siteToDisplay` property

### Adding a Shared Component

1. **Create in `sharedComponents/`:**
   ```javascript
   // src/sharedComponents/NewComponent.jsx
   export default function NewComponent({ children }) {
     // Implementation
   }
   ```

2. **Import Where Needed:**
   ```javascript
   import NewComponent from "../sharedComponents/NewComponent";
   ```

### Adding an API Hook

1. **Create Hook:**
   ```javascript
   // src/apiHooks/getNewResource.jsx
   import { queryApi } from "../Utils/api";

   export default async function getNewResource() {
     return await queryApi({
       url: "new-resource/",
       method: "GET",
     });
   }
   ```

2. **Use in Component:**
   ```javascript
   import { useQuery } from "@tanstack/react-query";
   import getNewResource from "../apiHooks/getNewResource";

   const { data, isSuccess } = useQuery(['new-resource'], getNewResource);
   ```

### Adding Site-Specific Behavior

```javascript
import { Site } from "../config/siteType";

const isUncontrast = Site.type === "uncontrast";

// Conditional rendering:
return (
  <>
    {isUncontrast ? <UnconContent /> : <ConContent />}
  </>
);

// Conditional data:
const endpoint = isUncontrast ? "/uncon-data" : "/con-data";

// Conditional styling:
const color = isUncontrast ? "blue" : "purple";
```

### Adding Assets

**Logos:**
- Location: `src/assets/logoes/`
- Import: `import Logo from "../assets/logoes/logo.png";`

**Icons:**
- Location: `src/assets/icons/`
- SVG Import: `import { ReactComponent as Icon } from "../assets/icons/icon.svg";`

---

## Testing

### E2E Tests (Playwright)

**Location:** `/e2e/`

**Example:** `contrast-uploadPaper.spec.ts`

**Run Tests:**
```bash
npx playwright test
```

**CI:** Tests run automatically via GitHub Actions on main/develop branches

---

## Configuration Files Reference

### vite.config.js
- Multi-mode build configuration
- Custom HTML transformation plugin
- Separate build outputs
- Bundle visualization

### tailwind.config.cjs
- Extended color palette
- Custom spacing/sizing
- Flowbite integration
- Dynamic class safelist

### postcss.config.cjs
- Tailwind plugin
- Autoprefixer

### playwright.config.ts
- E2E test configuration
- Browser targets

### package.json
- Build scripts for both modes
- Dev server modes
- Dependencies

---

## Deployment

### Build Artifacts

**ConTraSt:**
- Output: `dist-contrast/`
- Entry: `index.html`
- Analytics: `G-9XP6GJSL3K`

**UnconTraSt:**
- Output: `dist-uncontrast/`
- Entry: `index.html`
- Analytics: `G-V2RKDM2V4B`

### Monitoring

**Sentry:**
- Configured in entry points
- Transaction sampling: 100%
- Session replay: 10%
- Error replay: 100%

### API Endpoints

**Development:**
```
VITE_API_URL=http://localhost:8080/api/
```

**Production:**
```
VITE_API_URL=api/
```

---

## Important Files Quick Reference

### Configuration
- `/vite.config.js` - Build system
- `/tailwind.config.cjs` - Styling
- `/src/config/siteType.js` - Site detection
- `/src/state.jsx` - Global state

### Entry Points
- `/index-contrast.html` + `/src/contrast/main-contrast.jsx`
- `/index-uncontrast.html` + `/src/uncontrast/main-uncontrast.jsx`

### Routing
- `/src/contrast/ContrastScreens.jsx`
- `/src/uncontrast/UncontrastScreen.jsx`

### Shared Core
- `/src/sharedComponents/Navbar.jsx` - Navigation
- `/src/sharedComponents/Footer.jsx` - Footer
- `/src/sharedComponents/PageTemplate.jsx` - Layout
- `/src/sharedComponents/Reusble.jsx` - UI primitives
- `/src/Utils/GraphsDetails.jsx` - Graph metadata
- `/src/Utils/HardCoded.jsx` - Constants
- `/src/Utils/api.jsx` - HTTP client
- `/src/apiHooks/useAuth.jsx` - Authentication

### Styling
- `/src/index.css` - Global styles
- `/src/App.css` - App styles
- `/src/uncontrast/plotlyStyle.css` - Plotly overrides

---

## Critical Development Rules

### 1. Mode Awareness
Always remember: ConTraSt and UnconTraSt are separate builds. Test both when making shared component changes.

### 2. Site Type Checking
When modifying shared components, ask: "Does this need to behave differently per site?" If yes, use `Site.type` check.

### 3. Graph Metadata
New visualization pages MUST add metadata to `GraphsDetails.jsx` with correct `siteToDisplay` value.

### 4. Mobile Handling
Most graph routes need mobile detection with `<MobileScreen />` fallback.

### 5. Protected Routes
Auth-required pages need `<ProtectedRoute>` wrapper and `useAuth` check.

### 6. Dynamic Tailwind Classes
Dynamic color/style classes must be safelisted in `tailwind.config.cjs`.

### 7. API Hooks
All API calls through `apiHooks/` directory using React Query pattern.

### 8. Asset Organization
Logos in `assets/logoes/`, icons in `assets/icons/`. Follow existing naming patterns.

### 9. Build Testing
When changing build configuration, test both `build:contrast` and `build:uncontrast`.

### 10. Environment Variables
Always set correct `VITE_MODE_NAME` when testing. Check `.env.*` files match your mode.

---

## Common Pitfalls

### 1. Forgetting Site Type Check
**Problem:** Shared component doesn't adapt to site context.
**Solution:** Add `const isUncontrast = Site.type === "uncontrast";` check.

### 2. Wrong Directory Placement
**Problem:** Site-specific code in shared folders or vice versa.
**Solution:** Follow directory structure rules strictly.

### 3. Missing Safelist Entry
**Problem:** Dynamic Tailwind classes purged in production.
**Solution:** Add pattern to `tailwind.config.cjs` safelist.

### 4. Breaking Mobile Experience
**Problem:** Adding visualization page without mobile fallback.
**Solution:** Add `if (isMoblile) return <MobileScreen />;` check.

### 5. Incorrect Graph Metadata
**Problem:** Page shows in wrong site.
**Solution:** Set correct `siteToDisplay` in `GraphsDetails.jsx`.

### 6. Auth State Issues
**Problem:** Protected routes accessible without auth.
**Solution:** Wrap route with `<ProtectedRoute>` and check `state.auth`.

### 7. API Hook Misuse
**Problem:** Direct axios calls instead of hooks.
**Solution:** Create hook in `apiHooks/` and use React Query pattern.

### 8. Environment Confusion
**Problem:** Wrong API URL or mode detection.
**Solution:** Verify `.env.*` file matches current dev/build mode.

---

## Documentation Resources

Additional documentation in `/documentation/`:
- `two-projects-same-src.md` - Multi-project architecture
- `how-to-use-site-indicator-class.md` - Site detection usage
- `dev-server-plugin-fix.md` - Dev server workaround

---

## Summary

This is a **dual-mode monorepo** where the most critical concept is understanding:
1. Build-time mode separation (not runtime)
2. Shared vs. site-specific code organization
3. Site type detection pattern
4. Metadata-driven visualization routing

When in doubt:
- Check existing patterns in similar components
- Use `Site.type` for conditional behavior
- Follow directory structure rules
- Test both builds when changing shared code
