export function addDomKeyEvent(key, callback){
    if(!key.match(/^[a-zA-Z0-9]$/i)) throw new Error('Invalid KeyCombo');
    document.addEventListener('keydown', (e) => {
        if(
            e.ctrlKey &&
            e.altKey &&
            e.shiftKey &&
            e.key.toLowerCase() === key.toLowerCase()
        ) callback();
    });
}
