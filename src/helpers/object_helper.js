export function get(object, key, defaultValue) {
    if (object === null || object === undefined) {
        return defaultValue;
    }
    if (key in object) {
        return object[key];
    }
    return defaultValue;
}