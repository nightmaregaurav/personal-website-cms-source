import React from 'react';
import './index.scss'

const ObjectUI = ({onChange, isGhPage, info, name}) => {
    return (
        <>
            {name}
            <span className={"btn btn-danger"} onClick={() => onChange("abc~def", 123)}>click me</span>
            objectUI
        </>
    );
};

export default ObjectUI;
