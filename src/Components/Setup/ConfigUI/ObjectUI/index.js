import React, {useState} from 'react';
import './index.scss'
import ReactTooltip from "react-tooltip";
import ConfigUI from "../index";

const ObjectUI = ({onChange, isGhPage, info, name, parent_disabledStatus}) => {
    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = info?.cardinality ?? "Compulsory";
    const description = info?.description ?? "";
    const example_object = info?.example ?? {};

    const cancellable = () => cardinality === "Optional";
    const disable = () => {
        setDisabledStatus(true);
    }
    const enable = () => {
        setDisabledStatus(false);
    }
    const isDisabled = () => disabledStatus || parent_disabledStatus;

    function getContent() {
        const keys = Object.keys(example_object);
        if (keys.length === 0) {
            return <>Error parsing element info: NO EXAMPLE</>;
        }

        return <>
            {keys.map((key, i) => {
                return <ConfigUI key={i} onChange={onChange} isGhPage={isGhPage} info={example_object[key]} name={`${name}~${key}`} parent_disabledStatus={isDisabled()}/>
            })}
        </>
    }
    return (
        <>
            <div className="container" style={{minWidth: "70vw"}}>
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <span className="text-on-panel">
                            {cancellable()?<>
                                {isDisabled()?
                                    <i className={"panel-action bi-plus-circle-fill text-success me-2"} onClick={enable}/>:
                                    <i className={"panel-action bi-x-circle-fill text-danger me-2"} onClick={disable}/>
                                }
                            </>: null}
                            {(description !== "")?<>
                                <i data-tip={description} className={"panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={() => {
                                    setShowTooltip(false);
                                    setTimeout(() => setShowTooltip(true), 50);
                                }}/>
                                {showTooltip? <ReactTooltip />: null}
                            </>: null}
                            <b className={"panel-title"}>{name}</b>
                        </span>
                        <div className={"panel-content"}>
                            {getContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ObjectUI;
