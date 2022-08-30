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
        req.addEventListener("error", (e)=>{
            CONFIG = {};
        });
        req.open("GET", "/config.json");
        req.send();
    }, [null]);
}

export function useConfig() {
    const [config, setConfig] = useState({});
    useEffect(() => {
        setConfig(CONFIG)
    }, [config]);
    return config;
}