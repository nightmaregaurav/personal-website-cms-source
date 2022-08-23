import React from 'react';
import './index.scss';
import introImage from '../../../assets/owned/images/intro-image.jpg';
import Typed from 'react-typed';
import {useConfig} from '../../../helpers/config_helper'

const Intro = () => {
    const config = useConfig();

    return (
        <>
            <section id="intro" style={{background: "url(" + introImage + ")"}} className={"d-flex flex-column justify-content-center align-items-center"}>
                <div className={"intro-container text-center"} data-aos="fade-in">
                    <h1>{config["full-name"]}</h1>
                    <p>I'm <Typed strings={config["intro-words"]?? [""]} typeSpeed={40} backSpeed={50} loop />
                    </p>
                </div>
            </section>
        </>
    );
};

export default Intro;
