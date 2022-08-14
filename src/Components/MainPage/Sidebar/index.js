import React, {useEffect, useState} from 'react';
import './index.scss';
import profilePic from '../../../assets/owned/images/profile.jpg';
import {Link} from "react-router-dom";
import Footer from "../../Footer";
import {get_config} from '../../../helpers/config_helper'

const Sidebar = () => {
    const [config, setConfig] = useState({});
    useEffect(() => {
        get_config().then(config => setConfig(config));
    }, []);

    const toggleSideBar = () => {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        document.querySelector('.sidebar-toggler').classList.toggle('bi-list');
        document.querySelector('.sidebar-toggler').classList.toggle('bi-x');
    };

    const activateSidebar = () => {
        toggleSideBar();

        let path = window.location.pathname;
        let pathLength = path.length;
        if(path[pathLength - 1] === "/") path = path.substring(0, pathLength-1);

        let links = document.querySelectorAll('.auto-activate');
        for (let element of links){
            element.classList.remove("active");

            let href = element.pathname;
            let hrefLength = href.length;
            if(href[hrefLength - 1] === "/") href = href.substring(0, hrefLength-1);

            if(href === path) element.classList.add("active");
        }
    };

    window.addEventListener('load', activateSidebar);

    return (
        <>
            <i className={"bi bi-list mobile-nav-toggle d-xl-none sidebar-toggler"} onClick={toggleSideBar}></i>
            <header id="header">
                <div className={"d-flex flex-column"}>
                    <div className={"profile"}>
                        <img src={profilePic} alt={config["profile-alt"]} className={"img-fluid rounded-circle"} />
                        <h1 className={"text-light"}><Link to={"/"}>{config["full-name"]}</Link></h1>
                        <div className={"social-links mt-3 text-center"}>
                            {Object.entries(config["social-urls"] ?? {}).map((value,index) => <a key={index.toString()} target={"_blank"} rel="noreferrer" href={value[1].toString()} className={value[0]}><i className={"bx bxl-" + value[0]}/></a>)}
                        </div>
                    </div>
                    <nav id="navbar" className={"nav-menu navbar"}>
                        <div>
                            <span onClick={activateSidebar}><Link to={"/"} className={"nav-link auto-activate"}><i className={"bx bx-home"}></i> <span>Home</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/about"} className={"nav-link auto-activate"}><i className={"bx bx-user"}></i> <span>About</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/education"} className={"nav-link auto-activate"}><i className={"bx bx-abacus"}></i> <span>Education</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/experiences"} className={"nav-link auto-activate"}><i className={"bx bx-trophy"}></i> <span>Experiences</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/services"} className={"nav-link auto-activate"}><i className={"bx bx-server"}></i> <span>Services</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/technologies"} className={"nav-link auto-activate"}><i className={"bx bxs-component"}></i> <span>Technologies</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/documents"} className={"nav-link auto-activate"}><i className={"bx bx-book"}></i> <span>Documents</span></Link></span>
                            <span onClick={activateSidebar}><Link to={"/contact"} className={"nav-link auto-activate"}><i className={"bx bx-envelope"}></i> <span>Contact</span></Link></span>
                        </div>
                    </nav>
                    <Footer/>
                </div>
            </header>
        </>
    );
};

export default Sidebar;
