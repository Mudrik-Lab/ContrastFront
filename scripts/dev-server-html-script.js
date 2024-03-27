export const devServerHtmlScript = `
   
    //This is needed for dev server to run see documentation/dev-server-plugin-fix
    import RefreshRuntime from "/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
 `;
