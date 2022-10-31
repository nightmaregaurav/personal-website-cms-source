import React from 'react';
import './index.scss';
import {getConfig, getMainTitle} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";
import {getMeta} from "../../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";

const Services = () => {
    const config = getConfig();

    const page_title = `Services - ${getMainTitle()}`;
    const page_description = get(get(config, "services", {}), "intro", "");
    const page_image = "";

    return (
        <>
            <Helmet>
                <title>{page_title}</title>
                {getMeta(page_title, page_description, page_image)}
            </Helmet>

            {get(config, 'services', null) ? <>
                {(get(get(config, "services", {}), "intro", "") !== "" || Object.values(get(get(config, 'services', null), "contents", {})).length > 0) ? <section id="services" className="services">
                    <div className="container">
                        <div className="section-title">
                            <h2>Services</h2>
                            <p>{get(get(config, "services", {}), "intro", "")}</p>
                        </div>
                        {Object.values(get(get(config, "services", {}), "contents", {})).length > 0 ? <div className="row">
                            {Object.values(get(get(config, "services", {}), "contents", {})).map((content, index) => (
                                <div key={index} className="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                    <img className="icon" src={content.icon} alt={content.title.trim() + "'s icon"}/>
                                    <h4 className="title"><a href={content.link ?? ""}>{content.title}</a></h4>
                                    <p className="description">{content.description}</p>
                                </div>
                            ))}
                        </div> : null }
                    </div>
                </section> : null }

                {Object.values(get(get(config, "services", {}), "perks", {})).length > 0 ? <section id="perks" className="perks">
                    <div className="container">
                        <div className="section-title">
                            <h2>Perks</h2>
                        </div>
                        <div className="row no-gutters">
                            {Object.values(get(get(config, "services", {}), "perks", {})).map((content, index) => (
                                <div key={index} className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up">
                                    <div className="count-box">
                                        <img className="icon" src={content.icon} alt={content.title.trim() + "'s icon"}/>
                                        <p><strong>{content.title}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> : null}
            </> : null }
        </>
    );
};

export default Services;
