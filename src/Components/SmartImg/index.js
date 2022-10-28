import React from 'react';
import './index.scss';
import $ from 'jquery';

const SmartImg = ({id="", className="", imgId="", imgClassName="", src="", height="", width="", alt="", previewText="", style={}}) => {
    const replaceImage = (event) => {
        let alt = (previewText.trim() !== "")? previewText.trim() : getShortAlt(event.target.alt.trim());
        if (alt === "") return;

        let src = event.target.src.trim();
        if (src === "") return;

        let parentElement = $(event.target).parent();
        event.target.remove();

        let textSpan = $(parentElement).children();
        $(textSpan).text(alt);
        $(parentElement).css("border", "1px solid gray");
        $(parentElement).css("border-radius", "5px");
    };
    const getShortAlt = (alt) => {
        if (alt !== ""){
            alt = alt.split(" ");
            if(alt.length > 1) alt = alt[0][0] + alt[1][0];
            else alt = alt[0][0] + alt[0][1];
            alt = alt.toUpperCase();
        }

        return alt;
    };

    return (
        <>
            <div id={id} className={className.trim() + " smart-image-container d-flex flex-row justify-content-center align-content-center align-items-center"} style={{...style, width: width, height: height, minHeight: height, minWidth: width, overflow: "hidden"}}>
                <img id={imgId} className={imgClassName.trim() + " smart-image-element"} src={src} style={{maxHeight: height, maxWidth: width}} alt={alt} onError={replaceImage}></img>
                <span className={"text-muted text-opacity-75 font-monospace text-center"} style={{fontWeight: "bold"}}></span>
            </div>
        </>
    );
};

export default SmartImg;
