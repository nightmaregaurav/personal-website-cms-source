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
        } else if (Object.keys(CONFIG).length !== 0) {
            setConfig(CONFIG);
        } else {
            getConfig().then((data) => setConfig(data));
        }

        return () => {
        };
    }, []);

    return config;
}