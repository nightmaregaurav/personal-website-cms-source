import React, {useCallback, useEffect, useState} from 'react';
import './index.scss'
import {getValueFromName, useConfigValue} from "../../../../helpers/config_helper";
import {getLabelFromName} from "../../../../helpers/setup_helper";
import ReactTooltip from "react-tooltip";

const NumberUI = ({onChange, info, name, parent_disabledStatus, removable=false}) => {
    const default_value = getValueFromName(name, "");
    const [numberUiValue, setNumberUiValue] = useConfigValue("", onChange, name, true);
    const [oldValue, setOldValue] = useState(default_value);
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        setNumberUiValue(default_value);
    }, [default_value]);

    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = info?.minCardinality ?? "Compulsory";
    const description = info?.description ?? "";
    const step_validation = info?.validation?.step ?? 1;
    const min_validation = info?.validation?.min ?? null;
    const max_validation = info?.validation?.max ?? null;


    const validate = useCallback(() => {
        let valid = true;
        if(cardinality === "Compulsory" && numberUiValue === "") valid = false;

        const numerical_value = Number(numberUiValue);
        valid = valid && !isNaN(numerical_value);

        if(step_validation) valid = valid && (numerical_value % step_validation === 0);
        if(min_validation) valid = valid && (numerical_value >= min_validation);
        if(max_validation) valid = valid && (numerical_value <= max_validation);

        setIsValid(valid);
    }, [numberUiValue, cardinality, max_validation, step_validation, min_validation]);

    useEffect(() => {
        validate();
    }, [numberUiValue, validate]);

    const cancellable = () => cardinality === "Optional";
    const disable = () => {
        if(!removable){
            setOldValue(numberUiValue);
        }
        setNumberUiValue(default_value);
        setDisabledStatus(true);
    }
    const enable = () => {
        setNumberUiValue(oldValue)
        setDisabledStatus(false);
    }
    const isDisabled = () => disabledStatus || parent_disabledStatus;
    const isRemoved = () => isDisabled() && removable;

    const callSetter = (v) => {
        v = v.replace(/[^0-9.]/g, "");
        const numerical_value = Number(v);
        if(!isNaN(numerical_value)) setNumberUiValue(v);
    }

    // noinspection JSValidateTypes
    return (<>{isRemoved() ? null :
        <>
            <div className={`number-ui-container ui-${name} container`} style={isDisabled()?{opacity:0.50}:null}>
                <div className={"input-container"}>
                    <input className={`string-ui-input`} disabled={isDisabled()} type={"text"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={numberUiValue} data-value={numberUiValue} data-is-valid={isValid.toString()} onChange={(e) => callSetter(e.target.value)} onBlur={(_) => callSetter(numberUiValue.trim())} />
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
                            {(numberUiValue.length > 0) || (numberUiValue.length === 0 && !isValid) ? <small className={"placeholder-status"}>
                                {isValid ? <i className={"bi-check-circle-fill text-success me-1"}/> : <i className={"bi-x-circle-fill text-danger me-1"}/>}
                            </small> : null}
                            {(numberUiValue.length > 0) && ((min_validation !== null) || (max_validation !== null)) ? <small className={"placeholder-length"}>
                                [
                                    {min_validation !== null ? min_validation : null}
                                    {((min_validation !== null) && (max_validation !== null)) ? "-" : null}
                                    {max_validation !== null ? max_validation : null}
                                ]
                                {` Divisible by ${step_validation}`}
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

export default NumberUI;
