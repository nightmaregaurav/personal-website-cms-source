import React, {useCallback, useEffect, useMemo, useState} from 'react';
import "./index.scss";
import {get} from "../../helpers/object_helper";
import {useConfig} from "../../helpers/config_helper";
import {strip, rstrip} from "../../helpers/text_heper";
import {isValidUrl} from "../../helpers/url_helper";

const getRoot = (isGhPage) => strip(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + rstrip(rstrip(window.location.pathname, "/"), isGhPage ? "gh-sitemap" : "get-sitemap"), "/");

const SitemapGen = ({isGhPage}) => {
    const config = useConfig();
    const [path, setPath] = useState([]);

    const GetRoot = useCallback(
        () => {
            return getRoot(isGhPage);
        },
        [isGhPage],
    );
    const getUrl = (root, route) => isGhPage ? rstrip(strip(root + "/?/" + route, "/"), "/?/") : strip(root + "/" + route, "/");
    const time = useMemo(() => {
        return new Date().toISOString();
    }, []);

    useEffect(() => {
        const root = GetRoot();
        if(isValidUrl(root)){
            let routes = [
                "",
                "contact"
            ]
            if(get(config, "about", false)) routes.push("about");
            if(get(config, "education", false)) routes.push("education");
            if(get(config, "experience", false)) routes.push("experience");
            if(get(config, "projects", false)){
                routes.push("projects");
                const projects_list = get(get(config, "projects", {}), "contents", []);
                projects_list.map((_, index) => routes.push("projects/id_" + index));
            }
            if(get(config, "gallery", []).length > 0) routes.push("gallery");
            if(get(config, "services", false)) routes.push("services");
            if(get(config, "skills", false)) routes.push("skills");

            setPath(routes);
        }
        return () => {};
    }, [config, isGhPage, GetRoot]);

    return (
        <code><pre>
            {`<?xml version="1.0" encoding="UTF-8"?>\n`}
            {`<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`}
            {path.map(route => {
                let ret;
                ret = '\t<url>\n';
                ret += '\t\t<loc>' + getUrl(getRoot(isGhPage), route) + '</loc>\n';
                ret += '\t\t<lastmod>' + time + '</lastmod>\n';
                ret += '\t\t<changefreq>weekly</changefreq>\n';
                ret += '\t\t<priority>1.0</priority>\n';
                ret += '\t</url>\n';
                return ret;
            }).join("")}
            {`</urlset>`};
        </pre></code>
    );
};

export default SitemapGen;
