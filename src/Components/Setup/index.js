import React, {useState} from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import githubIcon from "../../assets/images/github.svg";
import {Helmet} from "react-helmet-async";
import {useGetFixed404Page, useGetFixedIndexPage} from "../../helpers/page_fix_helper";
import {useGetSiteMap} from "../../helpers/sitemap_helper";
import ConfigUI from "./ConfigUI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {getConfig} from "../../helpers/config_helper";
import {giveWarning} from "../../helpers/message_helper";
import {download} from "../../helpers/download_helper";
import {uploadFileToGithub, validateGithubApiKey, validateGithubRepository} from "../../helpers/github_helper";
import config_info from "../../assets/json/config-info.json";
import {lstrip, strip} from "../../helpers/text_heper";

const Setup = () => {
    const old_config = getConfig();
    const [siteType, setSiteType] = useState(null);
    const [apiKey, setApi] = useState(null);
    const [repositoryName, setRepository] = useState(null);
    const [config, setConfig] = useState(old_config);

    const setApiKey = async (key) => {
        if(key !== null || key !== "" || key !== undefined) {
            const valid = await validateGithubApiKey(key);
            if(!valid) {
                setApi(null);
            } else {
                setApi(key);
            }
        } else {
            setApi(key);
        }
    }
    const setRepositoryName = async (name) => {
        if(name !== null || name !== "" || name !== undefined) {
            const valid = await validateGithubRepository(apiKey, name);
            if(!valid) {
                setRepository(null);
            } else {
                setRepository(name);
            }
        } else {
            setRepository(name);
        }
    }

    const isConfigured = () => JSON.stringify(config) !== JSON.stringify(null) && JSON.stringify(config) !== JSON.stringify({}) && JSON.stringify(config) !== "" && JSON.stringify(config) !== JSON.stringify(old_config);
    const isGhPage = () => siteType === 'GH-PAGE';
    const showApiKeyPopup = () => isGhPage() && (apiKey === null || apiKey === '' || apiKey === undefined);
    const showRepositoryNamePopup = () => isGhPage() && !showApiKeyPopup() && (repositoryName === null || repositoryName === '' || repositoryName === undefined);
    const fallbackToCustom = (isFallback=true) => {
        if(isFallback) giveWarning("Failed to get github credentials. Falling back to Non-GitHub Pages Configuration.").then(_ => {});
        setSiteType('CUSTOM');
        setRepository(null);
        setApi(null);
    };

    const isValid = () => {
        const elements = document.querySelectorAll('[data-is-valid="false"]');
        return elements.length === 0;
    }
    const resetConfig = () => {
        setConfig({...old_config});
    };
    const modConfig = (key, value, reset=false) => {
        let prev_config = {...config};
        key = lstrip(key, 'Config~');
        key = strip(key, "~");

        if([undefined, null, ""].some(x => x===value)){
            reset = true;
        }

        const keys = key.split("~");
        const last_key = keys.pop();

        let root = prev_config;
        for(const k of keys) {
            if (root[k] === undefined){
                root[k] = {}
            }
            root = root[k];
        }

        if(reset) {
            delete root[last_key];
            setConfig(prev_config);
            if(Object.keys(root).length === 0 && keys.length !== 0) modConfig(keys.join("~"), undefined, true);
        } else {
            root[last_key] = value;
            setConfig(prev_config);
        }
    }

    const fixed_index_page = useGetFixedIndexPage();
    const fixed_404_page = useGetFixed404Page();
    const sitemap = useGetSiteMap(config, isGhPage());

    const save_config = () => {
        if(isValid()) {
            if (isGhPage()) {
                uploadFileToGithub(apiKey, repositoryName, 'config.json', btoa(JSON.stringify(config)), "Updated config.json from setup").then(_ => {
                });
            } else {
                download("config.json", JSON.stringify(config));
            }
        } else {
            giveWarning("Please resolve all the errors before saving the config.").then(_ => {});
        }
    }
    const save_sitemap = () => {
        if(isGhPage()){
            uploadFileToGithub(apiKey, repositoryName, "sitemap.xml", btoa(sitemap.content), "Updated sitemap.xml from setup").then(_ => {});
        } else {
            download("sitemap.xml", sitemap.content);
        }
    }
    const save_index = () => {
        if(isGhPage()){
            uploadFileToGithub(apiKey, repositoryName, "index.html", btoa(fixed_index_page.content), "Updated index.html from setup").then(_ => {});
        } else {
            download("index.html", fixed_index_page.content);
        }
    }
    const save_404 = () => {
        if(isGhPage()){
            uploadFileToGithub(apiKey, repositoryName, "404.html", btoa(fixed_404_page.content), "Updated 404.html from setup").then(_ => {});
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

            <div className="my-3 container d-flex flex-column flex-nowrap justify-content-center align-items-center">
                <span className={"btn btn-sm btn-danger ms-auto"} onClick={resetConfig}>Reset</span>
                <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center config-form"}>
                    <ConfigUI onChange={modConfig} isGhPage={isGhPage()} info={config_info} name={"Config"}/>
                </div>
            </div>

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
