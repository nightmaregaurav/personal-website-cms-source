import React, {useState} from 'react';
import './index.scss'
import {isValidImgUrl} from "../../../../helpers/url_helper";

const ImageUrlUI = ({onChange, validationCallback, isGhPage, info, name, parent_disabledStatus, removable=false}) => {
    const [imageValidity, setImageValidity] = useState(false);
    return (
        <>
            <input type={"url"} onChange={(e) => isValidImgUrl(e.target.value, setImageValidity)} />
            {!isGhPage?
                "uploader"
            :null}
        </>
    );
};

export default ImageUrlUI;
