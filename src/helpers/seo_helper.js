import {getConfig, getMainTitle} from "./config_helper";
import {get} from "./object_helper";
import React from "react";

export const getMeta = (title=null, description=null, image=null) => {
    title = title === "" ? null : title;
    description = description === "" ? null : description;
    image = image === "" ? null : image;

    const config = getConfig();
    const siteName = getMainTitle();
    const author = siteName;
    const currentUrl = window.location.href;

    title = title ? title : siteName;
    description = description? description : "Website Created With Personal Website CMS";
    image = image? image : get(config, "favicon", "");

    return <>
        {/*Primary Meta Tags*/}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        {/*Open Graph / Facebook*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property='og:site_name' content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {/*Twitter*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
    </>;
};