export function slugify(text) {
    return slugify_case_preserve(text.toLowerCase())
}

export function slugify_case_preserve(text) {
    return text.replace(/ /g, '-').replace(/[^\w-]+/g, '-').replace("[-]+", "-");
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

export function getRandomCharacters(length) {
    const characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}