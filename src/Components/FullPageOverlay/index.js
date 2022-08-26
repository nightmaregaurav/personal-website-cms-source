import React, {useEffect} from 'react';
import './index.scss';
import {useNavigate} from "react-router-dom";

const FullPageOverlay = ({content, sourcePageUrl}) => {
    const navigate = useNavigate();
    const navigateBack = () => navigate(sourcePageUrl, {replace: true});
    const escPressed = (event) => {
        if (event.key === "Escape") navigateBack();
    };

    useEffect(() => {
        document.addEventListener("keydown", escPressed, false);
        return () => document.removeEventListener("keydown", escPressed, false);
    }, []);

    return (
        <>
            <div className="full-page-overlay">
                <span className="d-flex flex-row flex-nowrap justify-content-center align-content-center align-items-center overlay-toggler bg-dark text-light" onClick={navigateBack}>
                    <i className={"bi-x"} />
                </span>
                <div className={"full-page d-flex flex-row flex-nowrap justify-content-center align-content-center align-items-center"}>
                    <div className={"overlay-content bg-light"}>
                        {content}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullPageOverlay;
