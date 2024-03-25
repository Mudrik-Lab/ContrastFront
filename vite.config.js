import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import {resolve} from 'path';

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {

    const defaultConfig = {
        plugins: [react(), svgr()],
    };
    switch (mode) {
        case "uncontrast_prod":
            return {
                ...defaultConfig, build: {
                    rollupOptions: {

                        input: {
                            uncontrast: resolve(__dirname, 'src/uncontrast/index-uncontrast.html'),
                        },
                    }, outDir: 'dist-uncontrast',

                },

            };
        case "contrast_prod":
            console.log("contrast_prod")
            return {
                ...defaultConfig, build: {
                    rollupOptions: {
                        input: {
                            contrast: resolve(__dirname, 'src/contrast/index-contrast.html'),
                        },
                    }, outDir: 'dist-contrast',
                },

            };

        default:
            return defaultConfig;
    }


    return {
        ...defaultConfig

    };
});



