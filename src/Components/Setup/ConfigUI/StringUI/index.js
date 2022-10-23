import React, {useState} from 'react';
import './index.scss';
import {getLabelFromName} from "../../../../helpers/setup_helper";
import {useConfigValue} from "../../../../helpers/config_helper";
import ReactTooltip from "react-tooltip";

const StringUI = ({onChange, info, name, parent_disabledStatus, removable=false}) => {
    const default_value = "";
    const [value, setValue] = useConfigValue(default_value, onChange, name);
    const [oldValue, setOldValue] = useState(default_value);

    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = info?.cardinality ?? "Compulsory";
    const description = info?.description ?? "";

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

    // noinspection JSValidateTypes
    return (<>{isRemoved()? null:
        <>
            <div className={"container"}>
                <div className={"input-container"}>
                    <input className={"string-ui-input"} disabled={isDisabled()} type={"text"} id={name} name={name} autoComplete={"off"} aria-labelledby={`placeholder${name}`} value={value} onChange={(e) => setValue(e.target.value)}/>
                    <span className={"placeholder-elements"} id={`placeholder${name}`}>
                        <label className={"placeholder-text"} htmlFor={name}>{getLabelFromName(name)}</label>
                        <span className={"placeholder-buttons"}>
                            {cancellable()?<>
                                {isDisabled()?
                                    <i className={"panel-action bi-plus-circle-fill text-success me-2"} onClick={enable}/>:
                                    <i className={"panel-action bi-x-circle-fill text-danger me-2"} onClick={disable}/>
                                }
                            </>: null}
                            {(description !== "")?<>
                                <i data-tip={description} data-for={name} className={"panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={() => {
                                    setShowTooltip(false);
                                    setTimeout(() => setShowTooltip(true), 50);
                                }}/>
                            </>: null}
                        </span>
                    </span>
                </div>
            </div>
            {showTooltip? <ReactTooltip id={name} />: null}
            validation and lengths
        </>
    }</>);
};

export default StringUI;
