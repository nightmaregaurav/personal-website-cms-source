export function slugify(text) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export function strip(src, char) {
    const escaped = char.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
    return src.replace(RegExp("^(" + escaped + ")+|(" + escaped + ")+$", "gm"),'');
}

export function lstrip(src, char) {
    const escaped = char.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
    return src.replace(RegExp("^(" + escaped + ")+|$", "gm"),'');
}
export function rstrip(src, char) {
    const escaped = char.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
    return src.replace(RegExp("^|(" + escaped + ")+$", "gm"),'');
}