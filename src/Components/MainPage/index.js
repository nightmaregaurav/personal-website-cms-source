import React from 'react';
import './index.scss';
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

const MainPage = () => {
    return (
        <>
            <Sidebar/>
            <Outlet/>
        </>
    );
};

export default MainPage;
