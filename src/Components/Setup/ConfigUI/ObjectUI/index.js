import React, {useState} from 'react';
import './index.scss'
import ReactTooltip from "react-tooltip";
import ConfigUI from "../index";
import {getLabelFromName} from "../../../../helpers/setup_helper";
import {parseCardinality} from "../../../../helpers/config_helper";

const ObjectUI = ({onChange, isGhPage, info, name, parent_disabledStatus, imageUploader}) => {
    const [disabledStatus, setDisabledStatus] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    // noinspection JSUnresolvedVariable
    const cardinality = parseCardinality(info)
    const description = info?.description ?? "";
    const example_object = info?.example ?? {};
    const isDisabled = () => disabledStatus || parent_disabledStatus;

    function getContent() {
        const keys = Object.keys(example_object);
        if (keys.length === 0) {
            return <>Error parsing element info: NO EXAMPLE</>;
        }

        return <>
            {keys.map((key, i) => {
                return <ConfigUI key={i} onChange={onChange} isGhPage={isGhPage} info={example_object[key]} name={`${name}~${key}`} parent_disabledStatus={isDisabled()} imageUploader={imageUploader} />
            })}
        </>
    }
    return (<>
        <div className={`object-ui-container ui-${name} container`}>
            <div className="object-panel object-panel-primary">
                <div className="object-panel-body">
                    <span className="text-on-object-panel">
                        {cardinality.isOptional?<>
                            {isDisabled()?
                                <i className={"object-panel-action bi-plus-circle-fill text-success me-2"} onClick={() => setDisabledStatus(false)}/>:
                                <i className={"object-panel-action bi-x-circle-fill text-danger me-2"} onClick={() => setDisabledStatus(true)}/>
                            }
                        </>: null}
                        {(description !== "")?<>
                            <i data-tip="" data-for={`obj${name}`} className={"object-panel-action bi-question-circle-fill text-warning me-2"} onMouseLeave={() => {
                                setShowTooltip(false);
                                setTimeout(() => setShowTooltip(true), 50);
                            }}/>
                        </>: null}
                        <b className={"object-panel-title"}>{getLabelFromName(name)}</b>
                    </span>
                    <div className={"object-panel-content"}>
                        {getContent()}
                    </div>
                </div>
            </div>
        </div>
        {showTooltip? <ReactTooltip id={`obj${name}`} place={"right"}>
            <b>{getLabelFromName(name)}:</b><br/>{description}
        </ReactTooltip> : null}
    </>);
};

export default ObjectUI;
