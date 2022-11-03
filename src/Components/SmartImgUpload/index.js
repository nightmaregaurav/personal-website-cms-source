import React, {useEffect, useState} from 'react';
import './index.scss';
import ReactTooltip from "react-tooltip";
import SmartImg from "../SmartImg";
import {getRandomCharacters} from "../../helpers/text_heper";
import {giveWarning} from "../../helpers/message_helper";

const SmartImgUpload = ({isDisabled, uploader, imageHelpText="", default_src=""}) => {
    const randomChars = getRandomCharacters(10);
    const [showTooltip, setShowTooltip] = useState(true);
    const [uploading, setUploading] = useState(false);

    const getTooltipContent = (_) => {
        let imageId = "imageInput-" + randomChars;
        let files = document.getElementById(imageId)?.files;
        let file = files?.[0];

        let default_src_path_length = 0;
        try {default_src_path_length = new URL(default_src).pathname.trim().replaceAll("/", "").length;} catch (e){}
        if (!file && default_src_path_length === 0) return "No file selected";

        let src = (!file)? default_src : URL.createObjectURL(file);
        return React.createElement(SmartImg, {height: "150px", width: "150px", className: 'image-upload-tooltip-preview', src: src, alt: "Uploaded Image", previewText: "Invalid Image"});
    };

    const callUploader = async (_) => {
        setUploading(true);
        const imageId = "imageInput-" + randomChars;
        let files = document.getElementById(imageId)?.files;
        let file = files?.[0];
        if (!file) return giveWarning("No file selected! Cannot Upload.");
        const now = new Date();
        const file_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds() + "-" + randomChars + "-" + file.name;
        await uploader(file_name, file);
        setUploaded(true)
    };

    const [uploaded, setUploaded] = useState(default_src.length !== 0);
    useEffect(() => {
        setUploading(false);
    }, [uploaded]);

    // noinspection JSValidateTypes
    return (
        <>
            <div className={"form-group mb-2 smart-image-upload"}>
                <div className={"input-group"}>
                    <input disabled={isDisabled()} onChange={() => setUploaded(false)} type={"file"} className={"form-control"} id={"imageInput-" + randomChars} aria-describedby={"imageHelp-" + randomChars} />
                    <span className={`btn btn-outline-success ${(uploading || isDisabled() || uploaded) ?"disabled":null}`} onClick={!uploading && !uploaded && !isDisabled() ? callUploader: null}>
                        {uploading ?
                            <i className={"bi bi-hourglass-split"} />:
                        uploaded ?
                            <i className={"bi-check-circle-fill"} /> :
                            <i className={"bi-upload"} />
                        }
                    </span>
                    <span
                        className={"btn btn-success"}
                        data-tip={""}
                        data-for={"imagePreview-" + randomChars}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => {
                            setShowTooltip(false);
                            setTimeout(() => setShowTooltip(true), 50);
                        }}
                    >
                        <i className={"bi-eye-fill"}/>
                    </span>
                </div>
                <small id={"imageHelp-" + randomChars} className={"imageHelp form-text text-muted"}>{imageHelpText}</small>
                {showTooltip && <ReactTooltip multiline={true} id={"imagePreview-" + randomChars} getContent={getTooltipContent} />}
            </div>
        </>
    );
};

export default SmartImgUpload;
