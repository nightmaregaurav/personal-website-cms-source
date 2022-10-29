import React, {useEffect, useState} from "react";
import './index.scss';
import AOS from "aos";
import {getConfig, useConfigGetter} from '../helpers/config_helper'
// noinspection ES6CheckImport
import {Sugar} from 'react-preloaders2';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Route, Routes, useNavigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Setup from "./Setup";
import {addDomKeyEvent} from "../helpers/keyboard_helper";

const Components = () => {
    useConfigGetter();
    const config = getConfig();
    const navigate = useNavigate();
    const setupKey = get(config, "setup-shortcut-key", "s");

    const [preLoaderLoading, setPreLoaderLoading] = useState(true);
    setTimeout(() => setPreLoaderLoading(false), 1000);

    useEffect(() => {
        // noinspection JSUnresolvedFunction
        AOS.init();
        // noinspection JSUnresolvedFunction
        AOS.refresh();
        addDomKeyEvent(setupKey, () => {
            if(!window.location.pathname.endsWith('/setup')) {
                navigate('/setup');
            }
        });
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="icon" href={get(config, "favicon", "")} />
                <link rel="apple-touch-icon" href={get(config, "apple-touch-icon", "")} />

                <title>{get(config, "main-title", "")}</title>

                {Object.values(get(config, "meta", {})).map((meta, i) => <meta
                    name={meta.name}
                    content={meta.content}
                    key={i}
                />)}
                {Object.values(get(config, "meta", {})).map((meta, i) => <meta
                    property={meta.name}
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
                        {get(config, "about", false) ? <Route path="about" element= {<About />} /> : null}
                        {get(config, "education", false) ? <Route path="education" element={<Education/>} /> : null}
                        {get(config, "experience", false) ? <Route path="experience" element={<Experience/>} /> : null}
                        {get(config, "projects", false) ? <Route path="projects" element={<Projects/>}>
                            <Route path=":id" element={<ProjectsView/>} />
                        </Route> : null}
                        {Object.values(get(config, "gallery", {})).length > 0 ? <Route path="gallery" element={<Gallery/>} /> : null}
                        {get(config, "services", false) ? <Route path="services" element= {<Services />} /> : null}
                        {get(config, "skills", false) ? <Route path="skills" element= {<Skills />} /> : null}
                        <Route path="contact" element= {<Contact />} />
                    </Route>

                    {/* Setup */}
                    <Route path="setup" element={<Setup />} />

                    {/* 404 Error */}
                    <Route path="*" element={<>
                        <ErrorPage title={"Error"} err_code={"404"} err_msg={"Not Found"}/>
                    </>}/>
                </Routes>
                <ToastContainer />
            </div>
        </HelmetProvider>
    );
}

export default Components;
