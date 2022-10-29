import React, {useCallback, useEffect, useState} from 'react';
import './index.scss'
import {getValueFromName, parseCardinality, useConfigValue} from "../../../../helpers/config_helper";
import {getLabelFromName} from "../../../../helpers/setup_helper";
import ReactTooltip from "react-tooltip";
import {isValidUrl} from "../../../../helpers/url_helper";

const UrlUI = ({onChange, info, name, parent_disabledStatus}) => {
    const default_value = getValueFromName(name, "");
    const [urlUiValue, setUrlUiValue] = useConfigValue("", onChange, name);
    const [oldValue, setOldValue] = useState(default_value);
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        setUrlUiValue(default_value);
    }, [default_value]);

    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = parseCardinality(info);
    const description = info?.description ?? "";
    const pattern_validation = info?.validation?.pattern ?? null;
    const min_length_validation = info?.validation?.minLength ?? null;
    const max_length_validation = info?.validation?.maxLength ?? null;

    const validate = useCallback(() => {
        let valid = true;
        if(cardinality.isCompulsory && urlUiValue === ""){
            valid = false;
        }
        if(pattern_validation){
            // noinspection JSCheckFunctionSignatures
            valid = valid && RegExp(pattern_validation).test(urlUiValue);
        }
        if(min_length_validation){
            valid = valid && urlUiValue.length >= min_length_validation;
        }
        if(max_length_validation){
            valid = valid && urlUiValue.length <= max_length_validation;
        }

        valid = valid && isValidUrl(urlUiValue);
        setIsValid(valid);
    }, [urlUiValue, cardinality, max_length_validation, min_length_validation, pattern_validation]);

    useEffect(() => {
        validate();
    }, [urlUiValue, validate]);

    useEffect(() => {
        if(parent_disabledStatus || disabledStatus){
            if(urlUiValue !== default_value){
                setOldValue(urlUiValue);
                setUrlUiValue(default_value);
            }
        } else {
            setUrlUiValue(oldValue);
        }
    }, [parent_disabledStatus, disabledStatus]);

    const isDisabled = () => disabledStatus || parent_disabledStatus;

    const callSetter = (v) => {
        setUrlUiValue(v);
    }

    // noinspection JSValidateTypes
    return (<>
        <div className={`url-ui-container ui-${name} container`} style={isDisabled()?{opacity:0.50}:null}>
            <div className={"input-container"}>
                <input className={`url-ui-input`} disabled={isDisabled()} type={"url"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={urlUiValue} data-value={urlUiValue} data-is-valid={isValid.toString()} onChange={(e) => callSetter(e.target.value)} onBlur={(_) => callSetter(urlUiValue.trim())} />
                <span className={"placeholder-elements"}>
                    <span className={"placeholder-text"} id={`placeholder${name}`}>{getLabelFromName(name)}</span>
                    <span className={"placeholder-buttons"}>
                        {cardinality.isOptional?<>
                            {isDisabled()?
                                <i className={"panel-action bi-plus-circle-fill text-success me-2"} onClick={() => setDisabledStatus(false)}/>:
                                <i className={"panel-action bi-x-circle-fill text-danger me-2"} onClick={() => setDisabledStatus(true)}/>
                            }
                        </>: null}
                        {(description !== "")?<>
                            <i data-tip="" data-for={name} className={"panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={() => {
                                setShowTooltip(false);
                                setTimeout(() => setShowTooltip(true), 50);
                            }}/>
                        </>: null}
                    </span>
                    <span className={"ms-auto pe-1 ps-1 placeholder-info"}>
                        {(urlUiValue.length > 0) || (urlUiValue.length === 0 && !isValid) ? <small className={"placeholder-status"}>
                            {isValid ? <i className={"bi-check-circle-fill text-success me-1"}/> : <i className={"bi-x-circle-fill text-danger me-1"}/>}
                        </small> : null}
                        {(urlUiValue.length > 0) && ((min_length_validation !== null) || (max_length_validation !== null)) ? <small className={"placeholder-length"}>
                            [
                            {urlUiValue.length}
                            /
                            {min_length_validation !== null ? min_length_validation : null}
                            {((min_length_validation !== null) && (max_length_validation !== null)) ? "-" : null}
                            {max_length_validation !== null ? max_length_validation : null}
                            ]
                        </small> : null}
                    </span>
                </span>
            </div>
        </div>
        {showTooltip? <ReactTooltip id={name}>
            <b>{getLabelFromName(name)}:</b><br/>{description}
        </ReactTooltip> : null}
    </>);
};

export default UrlUI;
