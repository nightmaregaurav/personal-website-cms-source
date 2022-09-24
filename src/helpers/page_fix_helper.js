import {getRoot} from "./setup_helper";
import {useMemo, useState} from "react";

export const useGetFixed404Page = () => {
    const [data, setData] = useState({
        content: '',
        status: 'INITIAL'
    });

    useMemo(() => {
        const root_url = getRoot();
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e) => {
            let page_data;
            page_data = e.target.responseText ?? "";
            const new_page_data = page_data.replace('let home = "";', `let home = "${root_url}";`);

            let status = "SUCCESS";
            if (new_page_data === page_data){
                status = "UNCHANGED";
            }
            setData({
                content: new_page_data,
                status: status
            });
        });
        req.addEventListener("error", _ => {
            setData({
                content: '',
                status: 'ERROR'
            });
        });
        req.open("GET", root_url + "/404.html");
        req.send();
    }, []);

    return data;
}

export const useGetFixedIndexPage = () => {
    const [data, setData] = useState({
        content: '',
        status: 'INITIAL'
    });
    useMemo(() => {
        const root_url = getRoot();
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e) => {
            let page_data;
            page_data = e.target.responseText ?? "";
            const new_page_data = page_data.replace('"/static/', `"${root_url}/static/`);
            let status = "SUCCESS";
            if (new_page_data === page_data){
                status = "UNCHANGED";
            }
            setData({
                content: new_page_data,
                status: status
            });
        });
        req.addEventListener("error", _ => {
            setData({
                content: '',
                status: 'ERROR'
            });
        });
        req.open("GET", root_url + "/index.html");
        req.send();
    }, []);

    return data;
}