# AGENTS.md - AI Coding Agent Instructions

## Before You Start

**MANDATORY:** Read `knowledgebase.md` in this directory before planning or implementing any changes. It contains critical architecture information about the dual-mode build system that affects every decision you make.

## Project Overview

This is a dual-mode React application (ConTraSt + UnconTraSt) built from a single codebase with separate build outputs. Understanding the build-time mode separation is **CRITICAL**.

---

## Dos and Don'ts

### Architecture & Build System

**DO:**
- Always consider both ConTraSt and UnconTraSt modes when modifying shared components
- Use `Site.type` for conditional rendering based on mode
- Test both `build:contrast` and `build:uncontrast` when changing build configuration
- Place site-specific code in `src/contrast/` or `src/uncontrast/` directories
- Place shared code in `src/sharedComponents/`, `src/apiHooks/`, or `src/Utils/`

**DON'T:**
- Assume mode switching happens at runtime (it's build-time only)
- Mix site-specific logic in shared components without `Site.type` checks
- Put shared code in site-specific directories
- Modify `vite.config.js` without understanding the multi-mode build strategy

### Component Development

**DO:**
- Use default exports for components
- Use PascalCase for component files (e.g., `HomePage.jsx`)
- Import UI primitives from `sharedComponents/Reusble.jsx` (Button, Text, Spacer, etc.)
- Add mobile detection with `if (isMoblile) return <MobileScreen />;` for visualization pages
- Use `React.lazy()` for heavy components (maps, large visualizations)

**DON'T:**
- Create new UI primitives without checking `Reusble.jsx` first
- Skip mobile fallback for visualization/graph pages
- Hard-code values that exist in `Utils/HardCoded.jsx`

### Styling

**DO:**
- Use Tailwind utility classes as the primary styling approach
- Use responsive modifiers (sm:, md:, lg:, xl:) for adaptive layouts
- Use extended color palette from `tailwind.config.cjs` (blue, azure, grayHeavy, etc.)
- Add dynamic color class patterns to safelist in `tailwind.config.cjs`
- Follow pattern: `className="flex justify-between items-center gap-4"`

**DON'T:**
- Use inline styles unless absolutely necessary
- Hard-code colors (use design tokens from Tailwind config)
- Create dynamic Tailwind classes without safelisting them
- Use `div` when a component exists in `Reusble.jsx`

### State Management

**DO:**
- Use Valtio for global client state (auth, user, path)
- Use React Query for all server state
- Create API hooks in `src/apiHooks/` directory
- Follow pattern: `const { data, isSuccess } = useQuery(['key'], apiFunction);`
- Use `state.auth` for authentication checks

**DON'T:**
- Make direct axios calls (create API hooks instead)
- Store server data in Valtio state
- Skip React Query caching for API calls
- Create local state for data that should be shared globally

### Routing

**DO:**
- Add new ConTraSt routes to `src/contrast/ContrastScreens.jsx`
- Add new UnconTraSt routes to `src/uncontrast/UncontrastScreen.jsx`
- Add graph metadata to `src/Utils/GraphsDetails.jsx` with `siteToDisplay` property
- Wrap authenticated routes with `<ProtectedRoute>`
- Use lazy loading for heavy pages

**DON'T:**
- Create routes without adding to routing files
- Skip `siteToDisplay` property in graph metadata
- Forget to add navigation entries for new graph pages

### API Integration

**DO:**
- Create hooks in `src/apiHooks/` for all API endpoints
- Use `queryApi()` helper from `src/Utils/api.jsx`
- Follow existing hook patterns (see `getFreeQueries.jsx`, `getStudies.jsx`)
- Use React Query's `enabled` option for conditional fetching
- Handle loading/error states with React Query's built-in flags

**DON'T:**
- Bypass the API hook pattern
- Make API calls outside of React Query
- Ignore error handling in API calls

### Authentication

**DO:**
- Check `state.auth` for authentication status
- Use `<ProtectedRoute>` for auth-required pages
- Use `useAuth` hook for auth validation
- Handle token expiration gracefully

**DON'T:**
- Implement custom auth checks (use existing patterns)
- Store sensitive data in local state
- Skip token validation on protected routes

### Site-Specific Features

**DO:**
- Use pattern: `const isUncontrast = Site.type === "uncontrast";`
- Set `siteToDisplay` to "contrast", "uncontrast", or "both" in graph metadata
- Import `Site` from `"../config/siteType"`
- Filter navigation/graphs based on `siteToDisplay`

**DON'T:**
- Hard-code site checks without using `Site.type`
- Forget to test both modes when changing shared components
- Mix site-specific logic without proper conditional checks

### File Organization

**DO:**
- Use feature folders: `pages/FeatureName/FeatureName.jsx`
- Group related components together
- Place assets in `src/assets/logoes/` or `src/assets/icons/`
- Use camelCase for utility files
- Use PascalCase for component files

**DON'T:**
- Create flat file structures for features
- Mix different feature components in the same directory
- Place assets in component directories

### Import/Export Patterns

**DO:**
- Use default exports for components
- Use named exports for utilities
- Import SVGs as components: `import { ReactComponent as Icon } from "...";`
- Import images directly: `import Logo from "../assets/logoes/logo.png";`

**DON'T:**
- Mix export styles within the same file
- Use dynamic imports except for lazy loading

---

## Common Commands

### Development
```bash
# Start ConTraSt dev server
npm run dev:contrast

# Start UnconTraSt dev server
npm run dev:uncontrast
```

### Building
```bash
# Build ConTraSt for production
npm run build:contrast

# Build UnconTraSt for production
npm run build:uncontrast
```

### Testing
```bash
# Run E2E tests
npx playwright test

# Run specific test
npx playwright test contrast-uploadPaper.spec.ts
```

### Linting/Formatting
```bash
# Check for issues (if configured)
npm run lint

# Format code (if configured)
npm run format
```

---

## File-Scoped Commands

When working on individual files, prefer targeted commands:

**Type checking (if TypeScript is added):**
```bash
# Not currently configured, but pattern would be:
tsc --noEmit <file.ts>
```

**Linting single file:**
```bash
# Pattern (if ESLint is configured):
eslint <file.jsx>
```

**Testing single component:**
```bash
# Pattern for Playwright:
npx playwright test --grep "ComponentName"
```

---

## Critical Patterns to Follow

### 1. Site Detection Pattern
```javascript
import { Site } from "../config/siteType";

const isUncontrast = Site.type === "uncontrast";

return (
  <img src={isUncontrast ? UnconLogo : Logo} alt="logo" />
);
```

### 2. API Hook Pattern
```javascript
// src/apiHooks/getResource.jsx
import { queryApi } from "../Utils/api";

export default async function getResource() {
  return await queryApi({
    url: "resource/",
    method: "GET",
  });
}

// Usage in component:
const { data, isSuccess } = useQuery(['resource'], getResource);
```

### 3. Mobile Detection Pattern
```javascript
import { isMoblile } from "../Utils/functions";

if (isMoblile) return <MobileScreen />;

// Desktop implementation
return <DesktopVisualization />;
```

### 4. Protected Route Pattern
```javascript
<ProtectedRoute
  path="/protected-page"
  element={<ProtectedPage />}
/>
```

### 5. Graph Metadata Pattern
```javascript
// src/Utils/GraphsDetails.jsx
{
  text: "Graph Name",
  tooltip: "Description",
  icon: <IconComponent />,
  color: "tailwindColor",
  route: "/graph-route",
  figureLine: "Explanation",
  siteToDisplay: "both" // or "contrast" or "uncontrast"
}
```

---

## Before Making Changes

### Planning Checklist

- [ ] Read `knowledgebase.md` for architecture understanding
- [ ] Determine if change affects one site or both
- [ ] Identify if new code should be shared or site-specific
- [ ] Check if existing patterns/components can be reused
- [ ] Verify mobile experience considerations
- [ ] Plan for authentication requirements (if applicable)
- [ ] Consider impact on both build modes

### Implementation Checklist

- [ ] Place files in correct directories (shared vs. site-specific)
- [ ] Use `Site.type` for conditional site-specific behavior
- [ ] Follow existing naming conventions
- [ ] Add mobile fallback for visualization pages
- [ ] Create API hooks for new endpoints
- [ ] Add route metadata if creating new graph page
- [ ] Update navigation if needed
- [ ] Safelist dynamic Tailwind classes
- [ ] Test both ConTraSt and UnconTraSt builds

### Testing Checklist

- [ ] Test in both ConTraSt mode (`npm run dev:contrast`)
- [ ] Test in both UnconTraSt mode (`npm run dev:uncontrast`)
- [ ] Verify mobile experience (resize browser or use device)
- [ ] Check authentication flow (if applicable)
- [ ] Verify API integrations work correctly
- [ ] Test responsive design at multiple breakpoints
- [ ] Build both modes successfully (`npm run build:contrast`, `npm run build:uncontrast`)

---

## Key Files Reference

When planning changes, these files are most commonly affected:

**Routing:**
- `src/contrast/ContrastScreens.jsx` - ConTraSt routes
- `src/uncontrast/UncontrastScreen.jsx` - UnconTraSt routes
- `src/Utils/GraphsDetails.jsx` - Graph metadata

**Configuration:**
- `vite.config.js` - Build configuration (rarely modified)
- `tailwind.config.cjs` - Styling configuration
- `src/config/siteType.js` - Site detection (rarely modified)

**Shared Core:**
- `src/sharedComponents/Navbar.jsx` - Navigation
- `src/sharedComponents/Footer.jsx` - Footer
- `src/sharedComponents/Reusble.jsx` - UI primitives
- `src/Utils/HardCoded.jsx` - Constants
- `src/Utils/api.jsx` - API client

**State:**
- `src/state.jsx` - Global state
- `src/apiHooks/useAuth.jsx` - Authentication

---

## Red Flags to Avoid

1. **"I'll just add runtime mode switching"** - No! Modes are build-time only.
2. **"I'll create this as a new primitive component"** - Check `Reusble.jsx` first.
3. **"I'll make this API call directly with axios"** - Create an API hook instead.
4. **"I'll add this without testing the other mode"** - Test both ConTraSt and UnconTraSt.
5. **"I'll use inline styles for this"** - Use Tailwind utilities.
6. **"I'll skip the mobile check"** - Visualization pages need mobile fallback.
7. **"I'll store this API data in Valtio"** - Use React Query for server state.
8. **"I'll add this graph without metadata"** - Add to `GraphsDetails.jsx`.

---

## Getting Help

If stuck or unclear about patterns:
1. Read `knowledgebase.md` for architecture details
2. Search codebase for similar implementations
3. Check existing patterns in `GraphsDetails.jsx`, `Reusble.jsx`, or API hooks
4. Review documentation in `/documentation/` folder
5. Examine existing pages in `src/contrast/pages/` or `src/uncontrast/pages/`

---

## Summary

This project's unique dual-mode architecture requires:
- Understanding build-time vs. runtime mode separation
- Proper directory organization (shared vs. site-specific)
- Consistent use of `Site.type` for conditional behavior
- Following established patterns for routing, state, and API integration
- Testing both modes for every change to shared code

Always read `knowledgebase.md` before starting work. It contains essential context that affects every decision.
