import {useMemo} from "react";

export function useConfigGetter() {
    useMemo(() => {
        let config_added_on = JSON.parse(localStorage.getItem("config_added_on"));
        let need_to_load_config;
        if (config_added_on) {
            let config_added_on_date = new Date(config_added_on);
            let current_date = new Date();
            let diff = current_date - config_added_on_date;
            let diff_in_seconds = diff / 1000;
            need_to_load_config = diff_in_seconds > 30;
        } else {
            need_to_load_config = true;
        }

        if (need_to_load_config) {
            const req = new XMLHttpRequest();
            req.addEventListener("load", (e) => {
                try {
                    localStorage.setItem("config", e.target.responseText);
                    localStorage.setItem("config_added_on", JSON.stringify(new Date()));
                } catch (_) {
                    localStorage.setItem("config", "{}");
                }
            });
            req.addEventListener("error", _ => {
                localStorage.setItem("config", "{}");
            });
            req.open("GET", "/config.json");
            req.send();
        }
    }, []);
}

export function useConfig() {
    return JSON.parse(localStorage.getItem("config")) ?? {};
}