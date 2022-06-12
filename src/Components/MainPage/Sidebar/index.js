import React from 'react';
import './index.scss';
import profilePic from '../../../assets/owned/images/profile.jpg'
import config from '../../../assets/owned/json/appconfig.json'
import {Link} from "react-router-dom";
import Footer from "../../Footer";


const Sidebar = () => {

    const toggleSideBar = () => {
        document.querySelector('body').classList.toggle('mobile-nav-active')
        document.querySelector('.sidebar-toggler').classList.toggle('bi-list')
        document.querySelector('.sidebar-toggler').classList.toggle('bi-x')
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
                            {(config["social-urls"]["github"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["github"]} className={"github"}><i className={"bx bxl-github"}/></a>}
                            {(config["social-urls"]["linkedin"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["linkedin"]} className={"linkedin"}><i className={"bx bxl-linkedin"}/></a>}
                            {(config["social-urls"]["facebook"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["facebook"]} className={"facebook"}><i className={"bx bxl-facebook"}/></a>}
                            {(config["social-urls"]["instagram"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["instagram"]} className={"instagram"}><i className={"bx bxl-instagram"}/></a>}
                            {(config["social-urls"]["twitter"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["twitter"]} className={"twitter"}><i className={"bx bxl-twitter"}/></a>}
                            {(config["social-urls"]["google-plus"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["google-plus"]} className={"google-plus"}><i className={"bx bxl-google-plus"}/></a>}
                            {(config["social-urls"]["youtube"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["youtube"]} className={"youtube"}><i className={"bx bxl-youtube"}/></a>}
                            {(config["social-urls"]["snapchat"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["snapchat"]} className={"snapchat"}><i className={"bx bxl-snapchat"}/></a>}
                            {(config["social-urls"]["dribbble"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["dribbble"]} className={"dribbble"}><i className={"bx bxl-dribbble"}/></a>}
                            {(config["social-urls"]["blogger"] == null)? null: <a target={"_blank"} rel="noreferrer" href={config["social-urls"]["blogger"]} className={"blogger"}><i className={"bx bxl-blogger"}/></a>}
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
