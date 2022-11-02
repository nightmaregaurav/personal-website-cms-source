import React from 'react';
import {getMeta} from "../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";
import {useNavigate} from "react-router-dom";

const Administration = () => {
    const navigate = useNavigate();

    return (<>
        <Helmet>
            {getMeta("Website Administration", "Tools for managing the website",)}
        </Helmet>

        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center m-0"} style={{height: "100vh", width: "100vw"}}>
            <h1>Administration</h1>
            <div className={"container d-flex flex-row flex-wrap justify-content-center align-items-center"}>
                <span className={"btn btn-primary m-2"} onClick={() => navigate("/setup/manage-blogs")}>Manage Blog</span>
                <span className={"btn btn-success m-2"} onClick={() => navigate("/setup")}>Manage Configuration</span>
            </div>
        </div>
    </>);
};

export default Administration;
