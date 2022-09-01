import {rstrip, strip} from "./text_heper";

export const getRoot = () => strip(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + rstrip(rstrip(window.location.pathname, "/"), "setup"), "/");