import React from 'react';
import './index.scss';
import {Outlet} from "react-router-dom";

const Projects = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default Projects;
