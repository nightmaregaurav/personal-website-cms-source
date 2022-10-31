import React from 'react';
import './index.scss';
import {getConfig, getMainTitle} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";
import {getMeta} from "../../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";

const Education = () => {
    const config = getConfig();

    const page_title = `Education - ${getMainTitle()}`;
    const page_description = get(get(config, "education", null), "intro", "");
    const page_image = "";

    // noinspection JSUnresolvedVariable
    return (
        <>
            <Helmet>
                <title>{page_title}</title>
                {getMeta(page_title, page_description, page_image)}
            </Helmet>

            {get(config, 'education', null) ? <>
                {(get(get(config, 'education', null), "intro", "") !== "" || Object.values(get(get(config, 'education', null), "timeline", {})).length > 0) ? <section id="education" className="education">
                    <div className="container">
                        <div className="section-title">
                            <h2>Education</h2>
                            <p>{get(get(config, "education", {}), "intro", "")}</p>
                        </div>
                        {Object.values(get(get(config, "education", {}), "timeline", {})).length > 0 ? <div>
                            <div data-aos="fade-up">
                                <h3 className="education-title">Timeline</h3>
                                {Object.values(get(get(config, "education", {}), "timeline", {})).map((data, i) =>
                                    <div key={i} className="education-item">
                                        <span>
                                            {data.title? <h4 style={{display: "inline"}}>{data.title}</h4> : null}
                                            {data.from || data.to ? <h5 className={"ms-3"} style={{display: "inline"}}>{data.from ? data.from : null} {data.from && data.to ? "-" : null} {data.to ? data.to : null}</h5> : null}
                                        </span>
                                        {data.institute || data.university ? <p><em>{data.institute ? <a style={{textDecoration: "none", color:"inherit"}} href={data.instituteUrl??"#"}>{data.institute}</a> : null} {data.institute && data.university ? " | " : null} {data.university ? <a style={{textDecoration: "none", color:"inherit"}} href={data.universityUrl??"#"}>{data.university}</a> : null}</em></p> : null}
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

export default Education;
