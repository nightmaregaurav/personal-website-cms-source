import {useMemo} from "react";

export function useConfigGetter() {
    useMemo(() => {
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e)=>{
            try{
                localStorage.setItem("config", e.target.responseText);
            } catch(_){
                localStorage.setItem("config", "{}");
            }
        });
        req.addEventListener("error", _ => {
            localStorage.setItem("config", "{}");
        });
        req.open("GET", "/config.json");
        req.send();
    }, []);
}

export function useConfig() {
    return JSON.parse(localStorage.getItem("config")) ?? {};
}