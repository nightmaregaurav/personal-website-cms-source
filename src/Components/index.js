import React, {useEffect, useState} from "react";
import './index.scss';
import AOS from "aos";

import {useConfig} from '../helpers/config_helper'
// noinspection ES6CheckImport
import {Sugar} from 'react-preloaders2';
import {Helmet, HelmetData} from "react-helmet-async";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainPage from "./MainPage";
import Intro from "./MainPage/Intro";
import About from "./MainPage/About";
import Education from "./MainPage/Education";
import Experiences from "./MainPage/Experiences";
import {default as ExperiencesList} from "./MainPage/Experiences/List";
import {default as ExperiencesView} from "./MainPage/Experiences/View";
import Services from "./MainPage/Services";
import Skills from "./MainPage/Skills";
import Documents from "./MainPage/Documents";
import Contact from "./MainPage/Contact";
import {get} from "../helpers/object_helper";

const helmetData = new HelmetData({});

const Components = () => {
    const config = useConfig();

    const [preLoaderLoading, setPreLoaderLoading] = useState(true);
    setTimeout(() => setPreLoaderLoading(false), 1000);

    useEffect(() => {
        // noinspection JSUnresolvedFunction
        AOS.init();
        // noinspection JSUnresolvedFunction
        AOS.refresh();
    }, []);

    return (
        <>
            <Helmet helmetData={helmetData}>
                <title>{get(config, "main-title", "")}</title>
            </Helmet>
            <Sugar customLoading={preLoaderLoading}/>

            <div className="App">
                <Routes>
                    {/* MainPage components*/}
                    <Route path="/" element={<MainPage/>}>
                        <Route path="" element= {<Intro/>} />
                        <Route path="about" element= {<About />} />
                        <Route path="education" element={<Education/>} />
                        <Route path="experiences" element={<Experiences/>}>
                            <Route path="" element={<ExperiencesList/>} />
                            <Route path="view/:id" element={<ExperiencesView/>} />
                        </Route>
                        <Route path="services" element= {<Services />} />
                        <Route path="skills" element= {<Skills />} />
                        <Route path="documents" element= {<Documents />} />
                        <Route path="contact" element= {<Contact />} />
                    </Route>

                    {/* 404 Error */}
                    <Route path="*" element={<>
                        <ErrorPage title={"Title"} err_code={"404"} err_msg={"Not Found"}/>
                    </>}/>
                </Routes>
            </div>
        </>
    );
}

export default Components;
