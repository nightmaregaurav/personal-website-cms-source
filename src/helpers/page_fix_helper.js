import {getRoot} from "./setup_helper";
import {useMemo, useState} from "react";

export const useGetFixed404Page = () => {
    const [data, setData] = useState("");
    useMemo(() => {
        const root_url = getRoot();
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e) => {
            let page_data = "";
            page_data = e.target.responseText;
            page_data = page_data.replace('let home = "";', `let home = "${root_url}";`);
            setData(page_data);
        });
        req.addEventListener("error", _ => {
            return ""
        });
        req.open("GET", root_url + "/404.html");
        req.send();
    }, []);

    return data;
}

export const useGetFixedIndexPage = () => {
    const [data, setData] = useState("");
    useMemo(() => {
        const root_url = getRoot();
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e) => {
            let page_data = "";
            page_data = e.target.responseText;
            page_data = page_data.replace('"/static/', `"${root_url}/static/`);
            setData(page_data);
        });
        req.addEventListener("error", _ => {
            return ""
        });
        req.open("GET", root_url + "/index.html");
        req.send();
    }, []);

    return data;
}