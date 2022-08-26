import React, {useEffect, useState} from "react";
import './index.scss';
import AOS from "aos";

import {useConfig} from '../helpers/config_helper'
// noinspection ES6CheckImport
import {Sugar} from 'react-preloaders2';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainPage from "./MainPage";
import Intro from "./MainPage/Intro";
import About from "./MainPage/About";
import Education from "./MainPage/Education";
import Experience from "./MainPage/Experience";
import Projects from "./MainPage/Projects";
import ProjectsView from "./MainPage/Projects/View";
import Services from "./MainPage/Services";
import Skills from "./MainPage/Skills";
import Contact from "./MainPage/Contact";
import {get} from "../helpers/object_helper";
import Gallery from "./MainPage/Gallery";

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
        <HelmetProvider>
            <Helmet>
                <link rel="icon" href={get(config, "favicon", "")} />
                <link rel="apple-touch-icon" href={get(config, "apple-touch-icon", "")} />

                <title>{get(config, "main-title", "")}</title>

                {get(config, "meta", []).map((meta, i) => <meta
                    name={meta.name}
                    content={meta.content}
                    key={i}
                />)}
            </Helmet>

            <Sugar customLoading={preLoaderLoading}/>

            <div className="App">
                <Routes>
                    {/* MainPage components*/}
                    <Route path="/" element={<MainPage/>}>
                        <Route path="" element= {<Intro/>} />
                        <Route path="about" element= {<About />} />
                        <Route path="education" element={<Education/>} />
                        <Route path="experience" element={<Experience/>} />
                        <Route path="projects" element={<Projects/>}>
                            <Route path=":id" element={<ProjectsView/>} />
                        </Route>
                        {get(config, "gallery", []).length > 0 ? <Route path="gallery" element={<Gallery/>} /> : null}
                        <Route path="services" element= {<Services />} />
                        <Route path="skills" element= {<Skills />} />
                        <Route path="contact" element= {<Contact />} />
                    </Route>

                    {/* 404 Error */}
                    <Route path="*" element={<>
                        <ErrorPage title={"Error"} err_code={"404"} err_msg={"Not Found"}/>
                    </>}/>
                </Routes>
            </div>
        </HelmetProvider>
    );
}

export default Components;
