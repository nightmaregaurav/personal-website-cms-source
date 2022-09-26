import React, {useState} from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import githubIcon from "../../assets/images/github.svg";
import {Helmet} from "react-helmet-async";
import {useGetFixed404Page, useGetFixedIndexPage} from "../../helpers/page_fix_helper";
import {useGetSiteMap} from "../../helpers/sitemap_helper";
import ConfigUI from "./ConfigUI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useConfig} from "../../helpers/config_helper";
import {giveWarning} from "../../helpers/message_helper";
import {download} from "../../helpers/download_helper";

const Setup = () => {
    const [siteType, setSiteType] = useState(null);
    const [userName, setUserName] = useState(null);
    const [repositoryName, setRepositoryName] = useState(null);
    const [apiKey, setApiKey] = useState(null);
    const [config, setConfig] = useState({});

    const old_config = useConfig();
    const isConfigured = () => JSON.stringify(config) !== JSON.stringify(null) && JSON.stringify(config) !== JSON.stringify({}) && JSON.stringify(config) !== "" && JSON.stringify(config) !== JSON.stringify(old_config);
    const isGhPage = () => siteType === 'GH-PAGE';
    const showUsernamePopup = () => isGhPage() && (userName === null || userName === '');
    const showRepositoryNamePopup = () => isGhPage() && !showUsernamePopup() && (repositoryName === null || repositoryName === '');
    const showApiKeyPopup = () => isGhPage() && !showUsernamePopup() && !showRepositoryNamePopup() && (apiKey === null || apiKey === '');
    const fallbackToCustom = (isFallback=true) => {
        if(isFallback) giveWarning("Failed to get github credentials. Falling back to Non-GitHub Pages Configuration.").then(_ => {});
        setSiteType('CUSTOM');
        setUserName(null);
        setRepositoryName(null);
        setApiKey(null);
    };

    const fixed_index_page = useGetFixedIndexPage();
    const fixed_404_page = useGetFixed404Page();
    const sitemap = useGetSiteMap(config, isGhPage());

    const save_config = () => {
        if(isGhPage()){
            console.log("Saving config for GitHub Pages");
            console.log(config);
        } else {
            download("config.json", JSON.stringify(config));
        }
    }
    const save_sitemap = () => {
        if(isGhPage()){
            console.log("Saving sitemap for GitHub Pages");
            console.log(sitemap.content);
        } else {
            download("sitemap.xml", sitemap.content);
        }
    }
    const save_index = () => {
        if(isGhPage()){
            console.log("Saving index for GitHub Pages");
            console.log(fixed_index_page.content);
        } else {
            download("index.html", fixed_index_page.content);
        }
    }
    const save_404 = () => {
        if(isGhPage()){
            console.log("Saving 404 for GitHub Pages");
            console.log(fixed_404_page.content);
        } else {
            download("404.html", fixed_404_page.content);
        }
    }

    return (
        <>
            <Helmet>
                <title>Personal Website Setup</title>
            </Helmet>

            {!siteType ? <SweetAlert
                custom
                showCancel
                confirmBtnText="Yes"
                cancelBtnText="No"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="light"
                customIcon={githubIcon}
                title="Is this site hosted on github pages?"
                onConfirm={() => setSiteType("GH-PAGE")}
                onCancel={() => fallbackToCustom(false)}
            /> : null}

            {showUsernamePopup() ? <SweetAlert
                showCancel
                confirmBtnText="Save"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="light"
                input
                required
                inputType="text"
                title="Enter Github Username"
                validationMsg="You must provide your github username, cancel to fall back to normal setup!"
                onConfirm={(response) => setUserName(response)}
                onCancel={fallbackToCustom}
            /> : null}

            {showRepositoryNamePopup() ? <SweetAlert
                showCancel
                confirmBtnText="Save"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="light"
                input
                required
                inputType="text"
                title="Enter Github Repository Name"
                validationMsg="You must provide your github repository name, cancel to fall back to normal setup!"
                onConfirm={(response) => setRepositoryName(response)}
                onCancel={fallbackToCustom}
            /> : null}

            {showApiKeyPopup() ? <SweetAlert
                showCancel
                confirmBtnText="Save"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="light"
                input
                required
                inputType="password"
                title="Enter Github API Key"
                validationMsg="You must provide your github api key, cancel to fall back to normal setup!"
                onConfirm={(response) => setApiKey(response)}
                onCancel={fallbackToCustom}
            /> : null}

            <ConfigUI setConfig={setConfig} userName={userName} repoName={repositoryName} apiKey={apiKey}/>
            <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center"}>
                {isConfigured() ? <span className={"btn btn-sm btn-success m-2"} onClick={save_config}>{isGhPage()? <i className={"bi bi-github"}/>: <i className={"bi bi-download"}/>} Save Config</span>: null}
                {sitemap.status === "SUCCESS" ? <span className={"btn btn-sm btn-primary m-2"} onClick={save_sitemap}>{isGhPage()? <i className={"bi bi-github"}/>: <i className={"bi bi-download"}/>} Save Sitemap</span>: null}
                {fixed_404_page.status === "SUCCESS" ? <span className={"btn btn-sm btn-danger m-2"} onClick={save_404}>{isGhPage()? <i className={"bi bi-github"}/>: <i className={"bi bi-download"}/>} Fix 404.html</span>: null}
                {fixed_index_page.status === "SUCCESS" ? <span className={"btn btn-sm btn-info m-2"} onClick={save_index}>{isGhPage()? <i className={"bi bi-github"}/>: <i className={"bi bi-download"}/>} Fix index.html</span>: null}
            </div>
        </>
    );
};

export default Setup;
