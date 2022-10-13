import React, {useState} from 'react';
import './index.scss'
import ReactTooltip from "react-tooltip";

const ObjectUI = ({onChange, isGhPage, info, name}) => {
    const [disabled, setDisabled] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    // noinspection JSUnresolvedVariable
    const cardinality = info.cardinality ?? "Compulsory";
    const description = info.description ?? "";
    const cancellable = () => cardinality === "Optional";
    const disable = () => {
        setDisabled(true);
    }
    const enable = () => {
        setDisabled(false);
    }

    function getContent() {
        return <>
            <span className={"mx-2"}>objectUI</span>
            <span className={"btn btn-danger"} onClick={() => onChange("abc~def", 123)}>click me</span>
        </>
    }
    return (
        <>
            <div className="container" style={{minWidth: "70vw"}}>
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <span className="text-on-panel">
                            {cancellable()?<>
                                {disabled?
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
