# Add ERC Logo to Uncontrast Navbar and Footer

## Context

Add the European Research Council (ERC) logo to the uncontrast website's Navbar and Footer components, positioned after the CIFAR logo.

## Current Logo Dimensions

- **ERC Logo**: 588 x 331 pixels (aspect ratio: 1.78:1)
  - Source: `/Users/alonisser/Downloads/2208-european-research-council-erc.png`
- **CIFAR Logo**: 1884 x 681 pixels (aspect ratio: 2.77:1)
  - Navbar display: 45-55px width (responsive)
  - Footer display: 60px width

## Implementation Plan

### 1. Resize ERC Logo

Create appropriately sized version to match CIFAR logo display dimensions:
- Target width: ~50-60px to match CIFAR sizing
- Maintain aspect ratio (1.78:1)
- Use sips command (macOS):
  ```bash
  # Option 1: Keep original size and let CSS handle scaling (recommended)
  cp /Users/alonisser/Downloads/2208-european-research-council-erc.png src/assets/logoes/erc-logo.png

  # Option 2: Pre-resize for optimization
  sips -Z 120 /Users/alonisser/Downloads/2208-european-research-council-erc.png --out src/assets/logoes/erc-logo.png
  ```

### 2. Update Navbar Component

**File**: `src/sharedComponents/Navbar.jsx`

**Changes**:
1. Add import at the top (after CIFAR import around line 5):
   ```jsx
   import ErcLogo from "../assets/logoes/erc-logo.png";
   ```

2. In the mobile section (around lines 89-106), add ERC logo after CIFAR:
   ```jsx
   {isUncontrast && (
     <>
       <a href="https://cifar.ca/" target="_blank" rel="noreferrer">
         <img
           src={Cifar}
           className="w-[45px]"
           alt="cifar logo on navbar"
         />
       </a>
       <a href="https://erc.europa.eu/" target="_blank" rel="noreferrer">
         <img
           src={ErcLogo}
           className="w-[45px]"
           alt="erc logo on navbar"
         />
       </a>
     </>
   )}
   ```

3. In the desktop section (around lines 180-194), add ERC logo after CIFAR:
   ```jsx
   {isUncontrast && (
     <>
       <a href="https://cifar.ca/" target="_blank" rel="noreferrer">
         <img
           src={Cifar}
           className="w-[45px] sm:w-[50px] lg:w-[55px]"
           alt="cifar logo on navbar"
         />
       </a>
       <a href="https://erc.europa.eu/" target="_blank" rel="noreferrer">
         <img
           src={ErcLogo}
           className="w-[45px] sm:w-[50px] lg:w-[55px]"
           alt="erc logo on navbar"
         />
       </a>
     </>
   )}
   ```

### 3. Update Footer Component

**File**: `src/sharedComponents/Footer.jsx`

**Changes**:
1. Add import at the top (after CIFAR import around line 4):
   ```jsx
   import ErcLogo from "../assets/logoes/erc-logo.png";
   ```

2. Add ERC logo after CIFAR (around lines 30-37):
   ```jsx
   {isUncontrast && (
     <>
       <a href="https://cifar.ca/" target="_blank" rel="noreferrer">
         <img src={Cifar} width={60} alt="cifar logo on footer" />
       </a>
       <a href="https://erc.europa.eu/" target="_blank" rel="noreferrer">
         <img src={ErcLogo} width={60} alt="erc logo on footer" />
       </a>
     </>
   )}
   ```

## Testing Checklist

- [ ] Logo displays correctly in Navbar (mobile view)
- [ ] Logo displays correctly in Navbar (desktop view)
- [ ] Logo displays correctly in Footer
- [ ] Logo only appears when `isUncontrast === true`
- [ ] Logo scales properly at different screen sizes
- [ ] Links to ERC website work correctly
- [ ] Visual alignment with CIFAR logo is consistent

## Files to Modify

1. `src/assets/logoes/erc-logo.png` (new file)
2. `src/sharedComponents/Navbar.jsx`
3. `src/sharedComponents/Footer.jsx`

## Notes

- ERC logo will only display for uncontrast mode (`isUncontrast === true`)
- Logo positioned as third item (after CIFAR, before other elements)
- Maintains consistent sizing with CIFAR logo (60px footer, 45-55px navbar responsive)
- External link points to https://erc.europa.eu/