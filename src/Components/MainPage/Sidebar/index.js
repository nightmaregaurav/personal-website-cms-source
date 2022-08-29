import React, {useEffect} from 'react';
import './index.scss';
import {Link} from "react-router-dom";
import Footer from "../../Footer";
import {useConfig} from '../../../helpers/config_helper'
import {get} from "../../../helpers/object_helper";

const toggleSideBar = () => {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    document.querySelector('.sidebar-toggler').classList.toggle('bi-list');
    document.querySelector('.sidebar-toggler').classList.toggle('bi-x');
};

const activateSidebarOnly = () => {
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
}

const activateSidebar = () => {
    toggleSideBar();
    activateSidebarOnly();
};

const Sidebar = () => {
    const config = useConfig();

    useEffect(() => {
        return () => {
            activateSidebarOnly();
        };
    }, []);

    return (
        <>
            <i className={"bi bi-list mobile-nav-toggle d-xl-none sidebar-toggler"} onClick={toggleSideBar}></i>
            <header id="header" className={"sidebar"}>
                <div className={"d-flex flex-column"}>
                    <div className={"profile"}>
                        {get(config, "profile-pic", "") !== "" ? <img src={get(config, "profile-pic", {})} alt={get(config, "profile-alt", "")} className={"img-fluid rounded-circle"} /> : null}
                        <h1 className={"text-light"}><Link to={"/"}>{get(config, "full-name", "")}</Link></h1>
                        <div className={"social-links mt-3 text-center"}>
                            {get(config, "social-urls", []).map((value, index) => <a key={index} target={"_blank"} rel="noreferrer" href={value.url} className={value.name}><i className={"bx bxl-" + value.name}/></a>)}
                        </div>
                    </div>
                    <nav id="navbar" className={"nav-menu navbar"}>
                        <div>
                            <span onClick={activateSidebar}><Link to={"/"} className={"nav-link auto-activate"}><i className={"bx bx-home"}></i> <span>Home</span></Link></span>
                            {get(config, "about", false) ? <span onClick={activateSidebar}><Link to={"/about"} className={"nav-link auto-activate"}><i className={"bx bx-user"}></i> <span>About</span></Link></span> : null}
                            {get(config, "education", false) ? <span onClick={activateSidebar}><Link to={"/education"} className={"nav-link auto-activate"}><i className={"bx bx-abacus"}></i> <span>Education</span></Link></span> : null}
                            {get(config, "experience", false) ? <span onClick={activateSidebar}><Link to={"/experience"} className={"nav-link auto-activate"}><i className={"bx bx-trophy"}></i> <span>Experience</span></Link></span> : null}
                            {get(config, "projects", false) ? <span onClick={activateSidebar}><Link to={"/projects"} className={"nav-link auto-activate"}><i className={"bx bx-book"}></i> <span>Projects</span></Link></span> : null}
                            {get(config, "gallery", []).length > 0 ? <span onClick={activateSidebar}><Link to={"/gallery"} className={"nav-link auto-activate"}><i className={"bx bx-photo-album"}></i> <span>Gallery</span></Link></span> : null}
                            {get(config, "services", false) ? <span onClick={activateSidebar}><Link to={"/services"} className={"nav-link auto-activate"}><i className={"bx bx-server"}></i> <span>Services</span></Link></span> : null}
                            {get(config, "skills", false) ? <span onClick={activateSidebar}><Link to={"/skills"} className={"nav-link auto-activate"}><i className={"bx bxs-component"}></i> <span>Skills</span></Link></span> : null}
                            <span onClick={activateSidebar}><Link to={"/contact"} className={"nav-link auto-activate"}><i className={"bx bx-envelope"}></i> <span>Contact</span></Link></span>
                            {get(config, "resume", "") !== "" ? <span onClick={activateSidebar}><a href={get(config, "resume", "#")} target={"_blank"} rel="noreferrer" className={"nav-link"}><i className={"bx bx-download"}></i> <span>Get Resume</span></a></span> : null}
                        </div>
                    </nav>
                    <Footer/>
                </div>
            </header>
        </>
    );
};

export default Sidebar;
