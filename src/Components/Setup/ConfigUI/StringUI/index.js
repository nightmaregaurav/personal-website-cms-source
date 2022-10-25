import React, {useEffect, useState} from 'react';
import './index.scss';
import {getLabelFromName} from "../../../../helpers/setup_helper";
import {useConfigValue} from "../../../../helpers/config_helper";
import ReactTooltip from "react-tooltip";

const StringUI = ({onChange, info, name, parent_disabledStatus, removable=false}) => {
    const default_value = "";
    const [value, setValue] = useConfigValue(default_value, onChange, name);
    const [oldValue, setOldValue] = useState(default_value);
    const [isValid, setIsValid] = useState(true);

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

    const validate = () => {
        let valid = true;
        if(cardinality === "Compulsory" && value === ""){
            valid = false;
        }
        if(pattern_validation){
            valid = valid && RegExp(pattern_validation).test(value);
        }
        if(min_length_validation){
            valid = valid && value.length >= min_length_validation;
        }
        if(max_length_validation){
            valid = valid && value.length <= max_length_validation;
        }
        setIsValid(valid);
    }
    useEffect(() => {
        validate();
    }, [value]);

    const cancellable = () => cardinality === "Optional";
    const disable = () => {
        if(!removable){
            setOldValue(value);
        }
        setValue(default_value);
        setDisabledStatus(true);
    }
    const enable = () => {
        setValue(oldValue)
        setDisabledStatus(false);
    }
    const isDisabled = () => disabledStatus || parent_disabledStatus;
    const isRemoved = () => isDisabled() && removable;

    const callSetter = (v) => {
        setValue(v);
    }

    const Element = isMultiline ? "textarea" : "input";
    // noinspection JSValidateTypes
    return (<>{isRemoved()? null:
        <>
            <div className={`string-ui-container ui-${name} container`} style={isDisabled()?{opacity:0.50}:null}>
                <div className={"input-container"}>
                    <Element className={`string-ui-${Element}`} disabled={isDisabled()} type={"text"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={value} data-value={value} data-is-valid={isValid.toString()} onChange={(e) => callSetter(e.target.value)} onBlur={(_) => setValue(value.trim())}/>
                    <span className={"placeholder-elements"}>
                        <label className={"placeholder-text"} id={`placeholder${name}`} htmlFor={name}>{getLabelFromName(name)}</label>
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
                            {(value.length > 0) || (value.length === 0 && !isValid) ? <small className={"placeholder-status"}>
                                {isValid ? <i className={"bi-check-circle-fill text-success me-1"}/> : <i className={"bi-x-circle-fill text-danger me-1"}/>}
                            </small> : null}
                            {(value.length > 0) && ((min_length_validation !== null) || (max_length_validation !== null)) ? <small className={"placeholder-length"}>
                                [
                                    {value.length}
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
