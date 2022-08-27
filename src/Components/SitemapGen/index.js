import React, {useEffect, useState} from 'react';
import "./index.scss";
import {useLocation} from "react-router-dom";
import {get} from "../../helpers/object_helper";
import {useConfig} from "../../helpers/config_helper";
import {strip, lstrip, rstrip} from "../../helpers/text_heper";
import {isValidUrl} from "../../helpers/url_helper";

const SitemapGen = ({isGhPage}) => {
    const config = useConfig();
    const location = useLocation();
    const [map, setMap] = useState("");
    const getUrl = (root, route) => isGhPage ? rstrip(strip(root + "/?/" + route, "/"), "/?/") : strip(root + "/" + route, "/");

    useEffect(() => {
        const root = strip(lstrip(location.pathname, "/"), isGhPage ? "gh-sitemap/" : "get-sitemap/");
        let sitemap;
        if(isValidUrl(root)){
            let routes = [
                "",
                "about",
                "education",
                "experience",
                "projects",
                "services",
                "skills",
                "contact"
            ]
            if(get(config, "gallery", []).length > 0) routes.push("gallery");

            const projects_list = get(get(config, "projects", {}), "contents", []);
            projects_list.map((_, index) => routes.push("projects/" + "id_" + index));

            sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
            sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
            sitemap += routes.map(route => {
                let ret = '';
                ret = '\t<url>\n';
                ret += '\t\t<loc>' + getUrl(root, route) + '</loc>\n';
                ret += '\t\t<lastmod>' + new Date().toISOString() + '</lastmod>\n';
                ret += '\t\t<changefreq>weekly</changefreq>\n';
                ret += '\t\t<priority>1.0</priority>\n';
                ret += '\t</url>\n';
                return ret;
            }).join("");
            sitemap += '</urlset>';
        } else {
            sitemap = "Not a valid root url";
        }
        setMap(sitemap);
        return () => {};
    }, []);



    return (
        <code><pre>
            {map}
        </pre></code>
    );
};

export default SitemapGen;
