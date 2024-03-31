/**
 * @description This class is used to get the site type, the default will be contrast
 */
export class Site {
    static contrast = "contrast";
    static unContrast = "uncontrast";
    static get isDev () {
        switch (import.meta.env.VITE_MODE_NAME) {
            case "contrast_prod":
            case "uncontrast_prod":
                return false;
            case "contrast_dev":
            case "uncontrast_dev":
                return false;
            default:
                return false;
        }
    }

    static get type() {
        switch (import.meta.env.VITE_MODE_NAME) {
            case "contrast_prod":
            case "contrast_dev":
                return Site.contrast;
            case "uncontrast_prod":
            case "uncontrast_dev":
                return Site.unContrast;
            default:
                return Site.contrast;
        }


    }


}
