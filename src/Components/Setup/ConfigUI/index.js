import React from 'react';
import './index.scss'
import {useConfig} from "../../../helpers/config_helper";

const ConfigUI = ({setConfig, userName, repoName, apiKey}) => {
    const old_config = useConfig();
    let new_config = {...old_config};

    return (
        <>
            <div className="my-3 container d-flex flex-column flex-nowrap justify-content-start align-items-start">
                <span>Reset button on top to reset whole/ add on each subsection as well</span>
                <span>{userName}</span>
                <span>{repoName}</span>
                <span>{apiKey}</span>
                <span>Block 1</span>
                <span>Block 2</span>
                <span>Block 3</span>
            </div>
        </>
    );
};

export default ConfigUI;
