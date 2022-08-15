import {useState, useEffect} from "react";

export function useConfig() {
    const [config, setConfig] = useState({});
    useEffect(() => {
        async function immediate() {
            const response = await fetch('/config.json', {method: 'GET'});
            setConfig(await response.json());
        }
        immediate().then(() => {});
        return () => {};
    }, []);
    return config;
}
