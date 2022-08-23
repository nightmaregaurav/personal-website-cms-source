import React from 'react';
import './index.scss';
import {useConfig} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";
import aboutImage from '../../../assets/owned/images/about-image.jpg';

const About = () => {
    const config = useConfig();

    return (
        <>
            <section id="about" className="about">
                <div className="container">
                    <div className="section-title">
                        <h2>About</h2>
                        <p>{get(get(config, "about", {}), "intro", "")}</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 d-flex flex-column justify-content-center align-content-center" data-aos="fade-right">
                            <img src={aboutImage} className="img-fluid" alt={get(get(config, "about", {}), "image-alt", "")} />
                        </div>
                        <div className="col-lg-8 pt-4 pt-lg-0 content d-flex flex-column justify-content-center align-content-center" data-aos="fade-left">
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul style={{marginTop:0, marginBottom:0}}>
                                        {Object.entries(get(get(config, "about", {}), "info", [])).map((item, index) => {
                                            if((index + 1) % 2 !== 0) return <li key={index.toString()} className={"my-3"} style={{marginTop:0, marginBottom:0}}><i className="bi bi-chevron-right"></i> <strong>{item[0]}:</strong> <span>{item[1].toString()}</span></li>
                                        })}
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul style={{marginTop:0, marginBottom:0}}>
                                        {Object.entries(get(get(config, "about", {}), "info", [])).map((item, index) => {
                                            if((index + 1) % 2 === 0) return <li key={index.toString()} className={"my-3"} style={{marginTop:0, marginBottom:0}}><i className="bi bi-chevron-right"></i> <strong>{item[0]}:</strong> <span>{item[1].toString()}</span></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
};

export default About;
