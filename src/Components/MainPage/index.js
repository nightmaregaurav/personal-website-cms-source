import React, {useEffect} from 'react';
import './index.scss';
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import BackToTop from "./BackToTop";

const adjustMargin = () => {
    let sidebar_width = document.querySelector('.sidebar')?.offsetWidth;
    let is_toggler_not_displaying = document.querySelector('.sidebar-toggler')?.offsetWidth === 0;
    let main_content = document.querySelector('#main-content');
    if (sidebar_width && main_content && is_toggler_not_displaying) {
        main_content.style.marginLeft = sidebar_width + 'px';
    } else {
        main_content.style.marginLeft = 0;
    }
}

const MainPage = () => {
    useEffect(() => {
        adjustMargin();
        window.addEventListener('resize', adjustMargin);
    } , []);

    return (
        <>
            <Sidebar/>
            <div id={"main-content"}>
                <Outlet/>
            </div>
            <BackToTop/>
        </>
    );
};

export default MainPage;
