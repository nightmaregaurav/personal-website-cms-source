import React, {useState} from 'react';
import './index.scss';
import {getLabelFromName} from "../../../../helpers/setup_helper";
import {useConfigValue} from "../../../../helpers/config_helper";
import ReactTooltip from "react-tooltip";

const StringUI = ({onChange, validationCallback, info, name, parent_disabledStatus, removable=false}) => {
    const default_value = "";
    const [value, setValue] = useConfigValue(default_value, onChange, name);
    const [oldValue, setOldValue] = useState(default_value);

    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = info?.cardinality ?? "Compulsory";
    const description = info?.description ?? "";
    const pattern_validation = info?.validation?.pattern ?? null;
    const min_length_validation = info?.validation?.minLength ?? null;
    const max_length_validation = info?.validation?.maxLength ?? null;
    // noinspection JSUnresolvedVariable
    const isMultiline = info?.validation?.linebreaks ?? false;

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
        let isValid = true;
        if(pattern_validation){
            isValid = pattern_validation.test(v);
        }
        if(min_length_validation){
            isValid = isValid && v.length >= min_length_validation;
        }
        if(max_length_validation){
            isValid = isValid && v.length <= max_length_validation;
        }
        validationCallback(name, isValid);
        setValue(v);
    }

    const Element = isMultiline ? "textarea" : "input";
    // noinspection JSValidateTypes
    return (<>{isRemoved()? null:
        <>
            <div className={"container"}>
                <div className={"input-container"}>
                    <Element className={"string-ui-input"} disabled={isDisabled()} type={"text"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={value} onChange={(e) => callSetter(e.target.value)} onBlur={(_) => setValue(value.trim())}/>
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
                                <i data-tip={`${getLabelFromName(name)}: ${description}`} data-for={name} className={"panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={() => {
                                    setShowTooltip(false);
                                    setTimeout(() => setShowTooltip(true), 50);
                                }}/>
                            </>: null}
                        </span>
                        <span className={"ms-auto pe-1 ps-1 placeholder-info"}>
                            {value.length > 0 && pattern_validation !== null ? <small className={"placeholder-status"}>
                                {value.match(pattern_validation) ? <i className={"bi-check-circle-fill text-success me-1"}/> : <i className={"bi-x-circle-fill text-danger me-1"}/>}
                            </small> : null}
                            {((min_length_validation !== null) || (max_length_validation !== null)) ? <small className={"placeholder-length"}>
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
            {showTooltip? <ReactTooltip id={name} />: null}
        </>
    }</>);
};

export default StringUI;
