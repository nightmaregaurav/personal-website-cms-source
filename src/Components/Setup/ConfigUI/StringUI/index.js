import React, {useCallback, useEffect, useState} from 'react';
import './index.scss';
import {getLabelFromName} from "../../../../helpers/setup_helper";
import {getValueFromName, useConfigValue} from "../../../../helpers/config_helper";
import ReactTooltip from "react-tooltip";

const StringUI = ({onChange, info, name, parent_disabledStatus, removable=false}) => {
    const default_value = getValueFromName(name, "");
    const [stringUiValue, setStringUiValue] = useConfigValue("", onChange, name);
    const [oldValue, setOldValue] = useState(default_value);
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        setStringUiValue(default_value);
    }, [default_value]);

    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = info?.minCardinality ?? "Compulsory";
    const description = info?.description ?? "";
    const pattern_validation = info?.validation?.pattern ?? null;
    const min_length_validation = info?.validation?.minLength ?? null;
    const max_length_validation = info?.validation?.maxLength ?? null;
    // noinspection JSUnresolvedVariable
    const isMultiline = info?.validation?.linebreaks ?? false;

    const validate = useCallback(() => {
        let valid = true;
        if(cardinality === "Compulsory" && stringUiValue === ""){
            valid = false;
        }
        if(pattern_validation){
            valid = valid && RegExp(pattern_validation).test(stringUiValue);
        }
        if(min_length_validation){
            valid = valid && stringUiValue.length >= min_length_validation;
        }
        if(max_length_validation){
            valid = valid && stringUiValue.length <= max_length_validation;
        }
        setIsValid(valid);
    }, [stringUiValue, cardinality, max_length_validation, min_length_validation, pattern_validation]);

    useEffect(() => {
        validate();
    }, [stringUiValue, validate]);

    const cancellable = () => cardinality === "Optional";
    const disable = () => {
        if(!removable){
            setOldValue(stringUiValue);
        }
        setStringUiValue(default_value);
        setDisabledStatus(true);
    }
    const enable = () => {
        setStringUiValue(oldValue)
        setDisabledStatus(false);
    }
    const isDisabled = () => disabledStatus || parent_disabledStatus;
    const isRemoved = () => isDisabled() && removable;

    const callSetter = (v) => {
        setStringUiValue(v);
    }

    const Element = isMultiline ? "textarea" : "input";
    // noinspection JSValidateTypes
    return (<>{isRemoved() ? null :
        <>
            <div className={`string-ui-container ui-${name} container`} style={isDisabled()?{opacity:0.50}:null}>
                <div className={"input-container"}>
                    <Element className={`string-ui-${Element}`} disabled={isDisabled()} type={"text"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={stringUiValue} data-value={stringUiValue} data-is-valid={isValid.toString()} onChange={(e) => callSetter(e.target.value)} onBlur={(_) => callSetter(stringUiValue.trim())} />
                    <span className={"placeholder-elements"}>
                        <span className={"placeholder-text"} id={`placeholder${name}`}>{getLabelFromName(name)}</span>
                        <span className={"placeholder-buttons"}>
                            {cancellable()?<>
                                {isDisabled()?
                                    <i className={"panel-action bi-plus-circle-fill text-success me-2"} onClick={enable}/>:
                                    <i className={"panel-action bi-x-circle-fill text-danger me-2"} onClick={disable}/>
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
                            {(stringUiValue.length > 0) || (stringUiValue.length === 0 && !isValid) ? <small className={"placeholder-status"}>
                                {isValid ? <i className={"bi-check-circle-fill text-success me-1"}/> : <i className={"bi-x-circle-fill text-danger me-1"}/>}
                            </small> : null}
                            {(stringUiValue.length > 0) && ((min_length_validation !== null) || (max_length_validation !== null)) ? <small className={"placeholder-length"}>
                                [
                                    {stringUiValue.length}
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
        </>
    }</>);
};

export default StringUI;
