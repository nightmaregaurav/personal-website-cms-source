export function isValidUrl(urlString){
    try {
        return Boolean(new URL(urlString));
    }
    catch(e){
        return false;
    }
}
export function isValidImgUrl(url, callback){
    const img = new Image();
    try{
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
        img.src = url;
    } catch (_) {
        callback(false);
    }
}