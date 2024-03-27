/**
 * @description This class is used to get the site type, the default will be contrast
 */
export class Site {
    static contrast = "contrast";
    static unContrast = "uncontrast";

    static get type() {
        switch (import.meta.env.VITE_MODE_NAME) {
            case "contrast_prod":
                return Site.contrast;
            case "uncontrast_prod":
                return Site.unContrast;
            default:
                return Site.contrast;
        }


    }


}
