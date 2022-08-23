import {useState, useEffect} from "react";
export var CONFIG = {}

async function getConfig() {
    const response = await fetch('/config.json', {method: 'GET'});
    const data = await response.json();
    CONFIG = data;
    return data;
}

export function useConfig() {
    const [config, setConfig] = useState({});
    useEffect(() => {
        if (Object.keys(config).length !== 0) {
            console.log("Config:", config);
        } else if (Object.keys(CONFIG).length !== 0) {
            setConfig(CONFIG);
            console.log("CONFIG:", CONFIG);
        } else {
            getConfig().then((data) => setConfig(data));
        }

        return () => {
        };
    }, []);

    return config;
}