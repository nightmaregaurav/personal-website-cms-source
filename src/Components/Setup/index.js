import React, {useState} from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import githubIcon from "../../assets/images/github.svg";
import {Helmet} from "react-helmet-async";
import {useGetFixed404Page, useGetFixedIndexPage} from "../../helpers/page_fix_helper";
import {getSiteMap} from "../../helpers/sitemap_helper";
import ConfigUI from "./ConfigUI";

const Setup = () => {
    const [siteType, setSiteType] = useState(null);
    const [userName, setUserName] = useState(null);
    const [repositoryName, setRepositoryName] = useState(null);
    const [apiKey, setApiKey] = useState(null);
    const [config, setConfig] = useState({});

    const isGhPage = () => siteType === 'GH-PAGE';
    const showUsernamePopup = () => isGhPage() && (userName === null || userName === '');
    const showRepositoryNamePopup = () => isGhPage() && !showUsernamePopup() && (repositoryName === null || repositoryName === '');
    const showApiKeyPopup = () => isGhPage() && !showUsernamePopup() && !showRepositoryNamePopup() && (apiKey === null || apiKey === '');
    const fallbackToCustom = () => {
        setSiteType('CUSTOM');
        setUserName(null);
        setRepositoryName(null);
        setApiKey(null);
    };

    const fixed_index_page = useGetFixedIndexPage();
    const fixed_404_page = useGetFixed404Page();
    const get_site_map = () => getSiteMap(config, isGhPage());

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
                onCancel={fallbackToCustom}
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
            <span>Save Button to save 404, index, sitemap and config/Download Button for downloading index, 404, sitemap, config</span>
        </>
    );
};

export default Setup;
