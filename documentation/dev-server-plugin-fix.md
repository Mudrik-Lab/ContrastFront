# Dev server plugn fix


## Problem 
When serving the vite html we get the following error:
```
functions.jsx:1 Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201
    at functions.jsx:1:39
    
``` 

## Reason

Because we changed the default html template, the plugin is not able to detect the preamble.
as noted [here](https://github.com/vitejs/vite/issues/1984) 

>Vite plugins (in this case @vitejs/plugin-react-refresh) won't be able to inject its HTML modifications

## Solution

Adding this script to the html template will fix the issue:
```html
<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>


## References

https://github.com/vitejs/vite/issues/1984
