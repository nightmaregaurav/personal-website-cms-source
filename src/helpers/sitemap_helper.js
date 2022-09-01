import {getRoot} from "./setup_helper";
import {isValidUrl} from "./url_helper";
import {get} from "./object_helper";
import {rstrip, strip} from "./text_heper";

const getRoutes = (config) => {
    const root = getRoot();
    if(isValidUrl(root)){
        let routes = [
            "",
            "contact",
            "setup"
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

        return routes;
    }
    return [];
}

const getUrl = (root, isGhPage, route) => isGhPage ? rstrip(strip(root + "/?/" + route, "/"), "/?/") : strip(root + "/" + route, "/");

export const getSiteMap = (config, isGhPage) => {
    const routes = getRoutes(config);
    const root = getRoot(isGhPage);
    const date = new Date().toISOString();

    let siteMap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    siteMap += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">';
    siteMap += routes.map(route => {
        let ret;
        ret = '\t<url>\n';
        ret += '\t\t<loc>' + getUrl(root, isGhPage, route) + '</loc>\n';
        ret += '\t\t<lastmod>' + date + '</lastmod>\n';
        ret += '\t\t<changefreq>weekly</changefreq>\n';
        ret += '\t\t<priority>1.0</priority>\n';
        ret += '\t</url>\n';
        return ret;
    }).join("");
    siteMap += '</urlset>';
    return siteMap;
}
