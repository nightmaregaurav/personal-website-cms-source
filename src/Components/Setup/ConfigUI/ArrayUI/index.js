import React from 'react';
import './index.scss'

const ArrayUI = ({onChange, elementType, isGhPage, info, name, parent_disabledStatus, removable=false}) => {
    return (
        <>
            arrayUI {info.cardinality}
        </>
    );
};

export default ArrayUI;