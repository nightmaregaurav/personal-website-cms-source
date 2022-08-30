import {useEffect, useMemo, useState} from "react";

export var CONFIG = {}

export function useConfigGetter() {
    useMemo(() => {
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e)=>{
            try{
                CONFIG = JSON.parse(e.target.responseText);
            } catch(_){
                CONFIG = {};
            }
        });
        req.addEventListener("error", _ => {
            CONFIG = {};
        });
        req.open("GET", "/config.json");
        req.send();
    }, []);
}

export function useConfig() {
    const [config, setConfig] = useState({});
    useEffect(() => {
        setConfig(CONFIG)
    }, [config]);
    return config;
}