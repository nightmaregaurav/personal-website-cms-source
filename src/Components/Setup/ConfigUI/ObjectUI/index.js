import React from 'react';
import './index.scss'

const ObjectUI = ({onChange, isGhPage, info, name}) => {
    return (
        <>
            <div className="container" style={{minWidth: "70vw"}}>
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <span className="text-on-panel">
                            <i className={"panel-action bi-x-circle-fill text-danger me-2"}/>
                            <i className={"panel-action bi-plus-circle-fill text-success me-2"}/>
                            <b className={"panel-title"}>{name}</b>
                            <i className={"panel-action bi-question-circle text-primary ms-2"}/>
                        </span>
                        <div className={"panel-content"}>
                            <span className={"btn btn-danger"} onClick={() => onChange("abc~def", 123)}>click me</span>
                            objectUI
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ObjectUI;
