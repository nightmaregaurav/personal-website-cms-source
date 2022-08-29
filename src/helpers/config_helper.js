import {useEffect, useState} from "react";

export var CONFIG = {}

async function getConfig() {
    const response = await fetch('/config.json', {method: 'GET'});
    CONFIG = await response.json().catch(() => ({}));
    return CONFIG;
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
    }, [config]);

    return config;
}