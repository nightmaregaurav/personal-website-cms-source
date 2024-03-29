import React, {useEffect, useState} from 'react';
import './index.scss'
import {getValueCountFromName, getValueFromName, parseCardinality} from "../../../../helpers/config_helper";
import ReactTooltip from "react-tooltip";
import {getLabelFromName} from "../../../../helpers/setup_helper";
import ConfigUI from "../index";

const ArrayUI = ({onChange, elementType, isGhPage, info, name, parent_disabledStatus, imageUploader}) => {
    const default_value_count = getValueCountFromName(name);
    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const [elementsCount, setElementsCount] = useState(1);
    // noinspection JSUnresolvedVariable
    const cardinality = parseCardinality(info)
    const description = info?.description ?? "";
    const validation = info?.validation ?? {};
    const example_array = info?.example ?? {};
    const isDisabled = () => disabledStatus || parent_disabledStatus;
    const addElement = () => setElementsCount(elementsCount + 1);

    const resetValue = (count) => {
        onChange(`${name}~${count.toString()}`, undefined);
    }

    const hasRemovableElements = () => {
        if(elementsCount === 0) return false;
        return !(cardinality.isCompulsory && elementsCount === 1);

    };
    const removeElement = () => {
        if(hasRemovableElements()){
            resetValue(elementsCount);
            setElementsCount(elementsCount - 1);
        }
    }

    const reduceElementsTo = (n) => {
        const diff = elementsCount - n;
        for(let i = 0; i < diff; i++){
            resetValue(elementsCount-i);
        }
        setElementsCount(n);
    };

    const resetArray = () => {
        if(cardinality.isCompulsory && default_value_count === 0){
            if(elementsCount > 1) reduceElementsTo(1)
            else setElementsCount(1);
        } else {
            if(elementsCount > default_value_count) reduceElementsTo(default_value_count);
            else setElementsCount(default_value_count);
        }
    };

    useEffect(() => {
        resetArray();
    }, [default_value_count]);
    useEffect(() => {
        if(isDisabled()) resetArray();
    }, [disabledStatus, parent_disabledStatus]);

    function getContent(n) {
        const _info = {
            type: elementType,
            minCardinality: "Compulsory",
            validation: validation,
            example: Object.values(example_array).at(0)
        }

        return <ConfigUI key={n} onChange={onChange} isGhPage={isGhPage} info={_info} name={`${name}~${n.toString()}`} parent_disabledStatus={isDisabled()} imageUploader={imageUploader} />
    }

    return (<>
        <div className={`array-ui-container ui-${name} container`}>
            <div className="array-panel array-panel-primary">
                <div className="array-panel-body">
                    <span className="text-on-array-panel">
                        {cardinality.isOptional?<>
                            {isDisabled()?
                                <i className={"array-panel-action bi-plus-circle-fill text-success me-2"} onClick={() => setDisabledStatus(false)}/>:
                                <i className={"array-panel-action bi-x-circle-fill text-danger me-2"} onClick={() => setDisabledStatus(true)}/>
                            }
                        </>: null}
                        {(description !== "")?<>
                            <i data-tip="" data-for={`arr${name}`} className={"array-panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={() => {
                                setShowTooltip(false);
                                setTimeout(() => setShowTooltip(true), 50);
                            }}/>
                        </>: null}
                        <b className={"array-panel-title"}>{getLabelFromName(name)}</b>
                    </span>
                    <div className={"array-panel-content"}>
                        {Array.from((Array(elementsCount)).keys()).map(n => getContent(n+1))}
                    </div>
                </div>
                <div className="array-panel-footer d-flex flex-row flex-wrap justify-content-center align-items-center">
                    <span className={"array-action-buttons btn btn-sm btn-outline-success px-5 mx-2 mb-3"} onClick={addElement}>+</span>
                    {hasRemovableElements() ? <span className={"array-action-buttons btn btn-sm btn-outline-danger px-5 mx-2 mb-3"} onClick={removeElement}>-</span> : null}
                </div>
            </div>
        </div>
        {showTooltip? <ReactTooltip id={`arr${name}`} place={"right"}>
            <b>{getLabelFromName(name)}:</b><br/>{description}
        </ReactTooltip> : null}
    </>);
};

export default ArrayUI;
