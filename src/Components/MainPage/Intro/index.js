import React from 'react';
import './index.scss';
import Typed from 'react-typed';
import {getConfig} from '../../../helpers/config_helper'
import {get} from "../../../helpers/object_helper";

const Intro = () => {
    const config = getConfig();

    return (
        <>
            <section id="intro" style={{background: "url(" + get(get(config, "intro", {}), "pic", "") + ")"}} className={"d-flex flex-column justify-content-center align-items-center"}>
                <div className={"intro-container text-center"} data-aos="fade-in">
                    <h1>{get(config, "full-name", "")}</h1>
                    {Object.values(get(get(config, "intro", {}), "words", {})).length > 0 ?
                        <p>I'm <Typed strings={Object.values(get(get(config, "intro", {}), "words", {}))} typeSpeed={40} backSpeed={50} loop /></p>
                    : null}
                </div>
            </section>
        </>
    );
};

export default Intro;
