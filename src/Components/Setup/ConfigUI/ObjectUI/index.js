import React from 'react';
import './index.scss'

const ObjectUI = ({onChange, isGhPage}) => {
    return (
        <>
            <span className={"btn btn-danger"} onClick={() => onChange("abc", 123)}>click me</span>
            objectUI
        </>
    );
};

export default ObjectUI;
