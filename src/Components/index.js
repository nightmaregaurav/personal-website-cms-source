import React, {useEffect, useState} from "react";
import './index.scss';
import config from '../assets/owned/json/appconfig.json';
import AOS from "aos";

// noinspection ES6CheckImport
import {Sugar} from 'react-preloaders2';
import {Helmet, HelmetData} from "react-helmet-async";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainPage from "./MainPage";
import Intro from "./MainPage/Intro";
import About from "./MainPage/About";
import Education from "./MainPage/Education";
import {default as EducationList} from "./MainPage/Education/List";
import {default as EducationView} from "./MainPage/Education/View";
import Experiences from "./MainPage/Experiences";
import {default as ExperiencesList} from "./MainPage/Experiences/List";
import {default as ExperiencesView} from "./MainPage/Experiences/View";
import Services from "./MainPage/Services";
import Technologies from "./MainPage/Technologies";
import Documents from "./MainPage/Documents";
import Contact from "./MainPage/Contact";

const helmetData = new HelmetData({});

const Components = () => {
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
                <title>{config["main-title"]}</title>
            </Helmet>
            <Sugar customLoading={preLoaderLoading}/>

            <div className="App">
                <Routes>
                    {/* MainPage components*/}
                    <Route path="/" element={<MainPage/>}>
                        <Route path="" element= {<Intro/>} />
                        <Route path="about" element= {<About />} />
                        <Route path="education" element={<Education/>}>
                            <Route path="" element={<EducationList/>} />
                            <Route path="view/:id" element={<EducationView/>} />
                        </Route>
                        <Route path="experiences" element={<Experiences/>}>
                            <Route path="" element={<ExperiencesList/>} />
                            <Route path="view/:id" element={<ExperiencesView/>} />
                        </Route>
                        <Route path="services" element= {<Services />} />
                        <Route path="technologies" element= {<Technologies />} />
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
