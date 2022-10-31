import React from 'react';
import './index.scss';
import {getConfig, getMainTitle} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/scss";
import "swiper/scss/pagination";
import "@fontsource/barlow-semi-condensed";
import blockquote from "../../../assets/images/blockquote.png"
import profile from "../../../assets/images/profile.png"
import {getMeta} from "../../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";

const About = () => {
    const config = getConfig();
    SwiperCore.use([Pagination]);

    const page_title = `About - ${getMainTitle()}`;
    const page_description = get(get(config, "about", {}), "intro", "");
    const page_image = get(get(config, "about", {}), "pic", "");

    // noinspection JSUnresolvedVariable
    return (
        <>
            <Helmet>
                <title>{page_title}</title>
                {getMeta(page_title, page_description, page_image)}
            </Helmet>

            {get(config, 'about', null) ? <>
                {(get(get(config, 'about', null), "pic", "") !== "" || get(get(config, 'about', null), "intro", "") !== "" || Object.values(get(get(config, 'about', null), "info", {})).length > 0) ? <section id="about" className="about">
                    <div className="container">
                        <div className="section-title">
                            <h2>About</h2>
                            <p>{get(get(config, "about", {}), "intro", "")}</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 d-flex flex-column justify-content-center align-content-center" data-aos="fade-right">
                                <img src={get(get(config, "about", {}), "pic", "")} className="img-fluid" alt={get(get(config, "about", {}), "image-alt", "")} />
                            </div>
                            <div className="col-lg-8 pt-4 pt-lg-0 content d-flex flex-column justify-content-center align-content-center" data-aos="fade-left">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <ul style={{marginTop:0, marginBottom:0}}>
                                            {Object.values(get(get(config, "about", {}), "info", {})).map((item, index) => {
                                                return ((index + 1) % 2 !== 0) ? <li key={index} className={"my-3"} style={{marginTop:0, marginBottom:0}}><i className="bi bi-chevron-right"></i> <strong>{item.title}:</strong> <span>{item.text}</span></li> : null;
                                            })}
                                        </ul>
                                    </div>
                                    <div className="col-lg-6">
                                        <ul style={{marginTop:0, marginBottom:0}}>
                                            {Object.values(get(get(config, "about", {}), "info", {})).map((item, index) => {
                                                return ((index + 1) % 2 === 0) ? <li key={index} className={"my-3"} style={{marginTop:0, marginBottom:0}}><i className="bi bi-chevron-right"></i> <strong>{item.title}:</strong> <span>{item.text}</span></li> : null;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : null }
                {Object.values(get(get(config, "about", {}), "testimonials", {})).length > 0 ? <section id="testimonials" className="testimonials section-bg">
                    <div className="container">
                        <div className="section-title">
                            <h2>Testimonials</h2>
                            <p>{get(get(config, "about", {}), "testimonials-intro", "")}</p>
                        </div>
                        <div className="slider-container container" data-aos="fade-up" data-aos-delay="100">
                            <div className="main-wrap container">
                                <Swiper slidesPerView={1} spaceBetween={8} initialSlide={0} centeredSlides={true} pagination={{clickable: true}}>
                                    {Object.values(get(get(config, "about", {}), "testimonials", {})).map((data, i) =>
                                        <SwiperSlide key={i}>
                                            <div className={"container"}>
                                                <div className="testimony-card row" style={{background: "#040b14 url('" + blockquote + "') no-repeat 100% 100%", backgroundBlendMode: "color-dodge"}}>
                                                    <div className="header col-12 col-lg-2 mt-3 my-lg-auto d-flex flex-row flex-lg-column justify-content-lg-center align-items-lg-center">
                                                        <img src={data.pic ?? profile} alt={data.name ?? ""} className="avatar" />
                                                        <div className="details">
                                                            {data.name ?
                                                                <div className="name text-lg-center">{data.name}</div>
                                                            : null}
                                                            {data.designation ?
                                                                <div className="status text-lg-center">{data.designation}</div>
                                                            : null}
                                                            {data.company ?
                                                                <div className="status text-lg-center">{data.company}</div>
                                                            : null}
                                                            {data.on ?
                                                                <div className={"status text-lg-center text-muted"}><strong>{data.on} </strong></div>
                                                            : null}
                                                        </div>
                                                    </div>
                                                    {data.highlight ?
                                                        <div className={"title col-12 " + (data.said ? "col-lg-4 " : "col-lg-10 ") + "mt-3 my-lg-auto"}>
                                                            {data.highlight}
                                                        </div>
                                                    : null}
                                                    {data.said ?
                                                        <div className={"quote col-12 " + (data.highlight ? "col-lg-6 " : "col-lg-10 mt-3 ") + "my-lg-auto"}>
                                                            {data.said}
                                                        </div>
                                                    : null}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section> : null }
            </> : null }
        </>
    );
};

export default About;
