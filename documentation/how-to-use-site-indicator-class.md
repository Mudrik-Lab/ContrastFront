# How to use site indicator class
 

## Inside the component
### Example for site type

if you want to know which site you are in, you can use the following code:
```typescript
import { Site } from "../site/Site";
console.log(Site.type);
```

### Example for site type in if statement

if you want to know which site you are in, you can use the following code:
```typescript
import { Site } from "../site/Site";
if (Site.type === Site.contrast) {
    console.log("contrast");
} else {
    console.log("uncontrast");
}
```
