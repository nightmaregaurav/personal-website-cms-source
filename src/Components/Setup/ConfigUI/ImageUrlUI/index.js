import React, {useCallback, useEffect, useState} from 'react';
import './index.scss'
import {isValidImgUrl} from "../../../../helpers/url_helper";
import {getValueFromName, parseCardinality, useConfigValue} from "../../../../helpers/config_helper";
import {getLabelFromName} from "../../../../helpers/setup_helper";
import ReactTooltip from "react-tooltip";
import SmartImgUpload from "../../../SmartImgUpload";
import {getCleanBase64File} from "../../../../helpers/upload_helper";

const ImageUrlUI = ({onChange, isGhPage, info, name, parent_disabledStatus, imageUploader}) => {
    const default_value = getValueFromName(name, "");
    const [imageUrlUiValue, setImageUrlUiValue] = useConfigValue("", onChange, name);
    const [oldValue, setOldValue] = useState(default_value);
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        setImageUrlUiValue(default_value);
    }, [default_value]);

    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const [uploadMode, setUploadMode] = useState(isGhPage);

    // noinspection JSUnresolvedVariable
    const cardinality = parseCardinality(info);
    const description = info?.description ?? "";
    const pattern_validation = info?.validation?.pattern ?? null;
    const min_length_validation = info?.validation?.minLength ?? null;
    const max_length_validation = info?.validation?.maxLength ?? null;

    const validate = useCallback(() => {
        let valid = true;
        if(cardinality.isCompulsory && imageUrlUiValue === ""){
            valid = false;
        }
        if(pattern_validation){
            // noinspection JSCheckFunctionSignatures
            valid = valid && RegExp(pattern_validation).test(imageUrlUiValue);
        }
        if(min_length_validation){
            valid = valid && imageUrlUiValue.length >= min_length_validation;
        }
        if(max_length_validation){
            valid = valid && imageUrlUiValue.length <= max_length_validation;
        }
        if(valid){
            isValidImgUrl(imageUrlUiValue, setIsValid);
        } else {
            setIsValid(false);
        }
    }, [imageUrlUiValue, cardinality, max_length_validation, min_length_validation, pattern_validation]);

    useEffect(() => {
        validate();
    }, [imageUrlUiValue, validate]);

    useEffect(() => {
        if(parent_disabledStatus || disabledStatus){
            if(imageUrlUiValue !== default_value){
                setOldValue(imageUrlUiValue);
                setImageUrlUiValue(default_value);
            }
        } else {
            setImageUrlUiValue(oldValue);
        }
    }, [parent_disabledStatus, disabledStatus]);

    const isDisabled = () => parent_disabledStatus || disabledStatus;

    const callSetter = (v) => {
        setImageUrlUiValue(v);
    }

    const blinkTooltip = useCallback(() => {
        setShowTooltip(false);
        setTimeout(() => setShowTooltip(true), 50);
    }, []);

    const switchUploadMode = () => {
        setImageUrlUiValue(default_value);
        setUploadMode(!uploadMode);
    };

    useEffect(() => {
        blinkTooltip();
    }, [uploadMode]);

    const uploader = async (file_name, image) => {
        const cleanB64 = await getCleanBase64File(image);
        const response = await imageUploader(name, file_name, cleanB64);
        setImageUrlUiValue(response);
    };

    function getPlaceholderElements(){
        return <span className={"image-placeholder-elements"}>
            <span className={"placeholder-text"} id={`placeholder${name}`}>{getLabelFromName(name)}</span>
            <span className={"placeholder-buttons"}>
                {cardinality.isOptional?<>
                    {isDisabled()?
                        <i className={"panel-action bi-plus-circle-fill text-success me-2"} onClick={() => setDisabledStatus(false)}/>:
                        <i className={"panel-action bi-x-circle-fill text-danger me-2"} onClick={() => setDisabledStatus(true)}/>
                    }
                </>: null}
                {isGhPage?<>
                    <i data-tip={`Switch to ${uploadMode ? "URL mode" : "upload mode"}.`} data-for={`swap-${name}`} className={"panel-action bi-arrow-repeat text-success me-2"} onClick={switchUploadMode} onMouseLeave={blinkTooltip}/>
                </>:null}
                {(description !== "")?<>
                    <i data-tip="" data-for={name} className={"panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={blinkTooltip}/>
                </>: null}
            </span>
            <span className={"ms-auto pe-1 ps-1 placeholder-info"}>
                {(imageUrlUiValue.length > 0) || (imageUrlUiValue.length === 0 && !isValid) ? <small className={"placeholder-status"}>
                    {isValid ? <i className={"bi-check-circle-fill text-success me-1"}/> : <i className={"bi-x-circle-fill text-danger me-1"}/>}
                </small> : null}
                {(imageUrlUiValue.length > 0) && ((min_length_validation !== null) || (max_length_validation !== null)) ? <small className={"placeholder-length"}>
                    [
                    {imageUrlUiValue.length}
                    /
                    {min_length_validation !== null ? min_length_validation : null}
                    {((min_length_validation !== null) && (max_length_validation !== null)) ? "-" : null}
                    {max_length_validation !== null ? max_length_validation : null}
                    ]
                </small> : null}
            </span>
        </span>
    }

    // noinspection JSValidateTypes
    return (<>
        <div className={`image-url-ui-container ui-${name} container`} style={isDisabled()?{opacity:0.50}:null}>
            {!uploadMode ? <div className={"input-container"}>
                <input className={`image-url-ui-input`} disabled={isDisabled()} type={"url"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={imageUrlUiValue} data-value={imageUrlUiValue} data-is-valid={isValid.toString()} onChange={(e) => callSetter(e.target.value)} onBlur={(_) => callSetter(imageUrlUiValue.trim())} />
                {getPlaceholderElements()}
            </div> : <div className={"upload-container"}>
                <SmartImgUpload isDisabled={isDisabled} uploader={uploader} default_src={imageUrlUiValue} imageHelpText={
                    getPlaceholderElements()
                }/>
            </div>}
        </div>
        {showTooltip? <>
            <ReactTooltip id={name}>
                <b>{getLabelFromName(name)}:</b><br/>{description}
            </ReactTooltip>
            <ReactTooltip id={`swap-${name}`} />
        </> : null}
    </>);
};

export default ImageUrlUI;
