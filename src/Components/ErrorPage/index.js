import React from 'react';
import './index.scss';
import {Link} from "react-router-dom";
import {Helmet, HelmetData} from "react-helmet-async";

const helmetData = new HelmetData({});

const ErrorPage = ({title, err_code, err_msg}) => {
    return (
        <>
            <Helmet helmetData={helmetData}>
                <title>{title}</title>
            </Helmet>

            <div id="errorPage">
                <div className="errorPage">
                    <div className="errorPage-code">
                        <h1>{err_code[0]}<span>{err_code[1]}</span>{err_code[2]}</h1>
                    </div>
                    <p>{err_msg}</p>
                    <Link to="/">home page</Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
