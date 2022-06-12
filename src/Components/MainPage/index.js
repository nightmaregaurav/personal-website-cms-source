import React from 'react';
import './index.scss';
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import BackToTop from "./BackToTop";


const MainPage = () => {
    return (
        <>
            <Sidebar/>
            <Outlet/>
            <BackToTop/>
        </>
    );
};

export default MainPage;
