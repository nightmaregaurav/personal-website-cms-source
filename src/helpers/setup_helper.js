import {rstrip, strip} from "./text_heper";

export const getRoot = () => strip(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + rstrip(rstrip(window.location.pathname, "/"), "setup"), "/");
export const getLabelFromName = (name) => {
    const text = name.split("~").at(-1);
    const result = text.replace(/([_\-]\w)|([a-z][A-Z])/g, (w) => w[0] + " " + w[1].toUpperCase());
    return result.charAt(0).toUpperCase() + result.slice(1);
}