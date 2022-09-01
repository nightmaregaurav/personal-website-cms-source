import React, {useState} from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import githubIcon from "../../assets/images/github.svg";

const Setup = () => {
    const [siteType, setSiteType] = useState(null);
    const [userName, setUserName] = useState(null);
    const [repositoryName, setRepositoryName] = useState(null);
    const [apiKey, setApiKey] = useState(null);
    const isGhPage = () => siteType === 'gh-page';

    return (
        <>
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
                onCancel={() => setSiteType("CUSTOM")}
            /> : (isGhPage() && (userName === null || repositoryName === null || apiKey === null)) ?  <SweetAlert
                custom
                showCancel
                confirmBtnText="Yes"
                cancelBtnText="No"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="light"
                customIcon=""
                title="Github Credentials:"
                onConfirm={() => {}}
                onCancel={() => {}}
            /> : null}
        </>
    );
};

export default Setup;
