import React, {useEffect, useState} from 'react';
import './index.scss';
import introImage from '../../../assets/owned/images/intro-image.jpg';
import Typed from 'react-typed';
import {get_config} from '../../../helpers/config_helper'

const Intro = () => {
    const [config, setConfig] = useState({});
    useEffect(() => {
        get_config().then(config => setConfig(config));
    }, []);

    return (
        <>
            <section id="hero" style={{background: "url(" + introImage + ")"}} className={"d-flex flex-column justify-content-center align-items-center"}>
                <div className={"hero-container text-center"} data-aos="fade-in">
                    <h1>{config["full-name"]}</h1>
                    <p>I'm <Typed strings={config["intro-words"]?? [""]} typeSpeed={40} backSpeed={50} loop />
                    </p>
                </div>
            </section>
        </>
    );
};

export default Intro;
