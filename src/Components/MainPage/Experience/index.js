import React from 'react';
import './index.scss';
import {get} from "../../../helpers/object_helper";
import {getConfig, getMainTitle} from "../../../helpers/config_helper";
import {getMeta} from "../../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";

const Experience = () => {
    const config = getConfig();

    const page_title = `Experience - ${getMainTitle()}`;
    const page_description = get(get(config, "experience", {}), "intro", "");
    const page_image = "";

    // noinspection JSUnresolvedVariable
    return (
        <>
            <Helmet>
                <title>{page_title}</title>
                {getMeta(page_title, page_description, page_image)}
            </Helmet>

            {get(config, 'experience', null) ? <>
                {(get(get(config, 'experience', null), "intro", "") !== "" || Object.values(get(get(config, 'experience', null), "timeline", {})).length > 0) ? <section id="experience" className="experience">
                    <div className="container">
                        <div className="section-title">
                            <h2>Experience</h2>
                            <p>{get(get(config, "experience", {}), "intro", "")}</p>
                        </div>
                        {Object.values(get(get(config, "experience", {}), "timeline", {})).length > 0 ? <div>
                            <div data-aos="fade-up">
                                <h3 className="experience-title">Timeline</h3>
                                {Object.values(get(get(config, "experience", {}), "timeline", {})).map((data, i) =>
                                    <div key={i} className="experience-item">
                                        <span>
                                            {data.title? <h4 style={{display: "inline"}}>{data.title}</h4> : null}
                                            {data.from || data.to ? <h5 className={"ms-3"} style={{display: "inline"}}>{data.from ? data.from : null} {data.from && data.to ? "-" : null} {data.to ? data.to : null}</h5> : null}
                                        </span>
                                        {data.organization ? <p><em><a style={{textDecoration: "none", color:"inherit"}} href={data.organizationUrl??"#"}>{data.organization}</a></em></p> : null}
                                        <p>{data.description}</p>
                                        {Object.values(data.achievements).length > 0 ?
                                            <ul>
                                                {Object.values(data.achievements).map((achievement, i) =>
                                                    <li key={i}>{achievement}</li>
                                                )}
                                            </ul>
                                            : null}
                                    </div>
                                )}
                            </div>
                        </div> : null }
                    </div>
                </section> : null }
            </> : null }
        </>
    );
};

export default Experience;
