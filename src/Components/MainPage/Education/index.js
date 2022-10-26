import React from 'react';
import './index.scss';
import {getConfig} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";

const Education = () => {
    const config = getConfig();

    // noinspection JSUnresolvedVariable
    return (
        <>
            {get(config, 'education', null) ? <>
                {(get(get(config, 'education', null), "intro", "") !== "" || get(get(config, 'education', null), "timeline", []).length > 0) ? <section id="education" className="education">
                    <div className="container">
                        <div className="section-title">
                            <h2>Education</h2>
                            <p>{get(get(config, "education", {}), "intro", "")}</p>
                        </div>
                        {get(get(config, "education", {}), "timeline", []).length > 0 ? <div>
                            <div data-aos="fade-up">
                                <h3 className="education-title">Timeline</h3>
                                {get(get(config, "education", {}), "timeline", []).map((data, i) =>
                                    <div key={i} className="education-item">
                                        <span>
                                            {data.title? <h4 style={{display: "inline"}}>{data.title}</h4> : null}
                                            {data.from || data.to ? <h5 className={"ms-3"} style={{display: "inline"}}>{data.from ? data.from : null} {data.from && data.to ? "-" : null} {data.to ? data.to : null}</h5> : null}
                                        </span>
                                        {data.institute || data.university ? <p><em>{data.institute ? <a style={{textDecoration: "none", color:"inherit"}} href={data.instituteUrl??"#"}>{data.institute}</a> : null} {data.institute && data.university ? " | " : null} {data.university ? <a style={{textDecoration: "none", color:"inherit"}} href={data.universityUrl??"#"}>{data.university}</a> : null}</em></p> : null}
                                        <p>{data.description}</p>
                                        {data.achievements ?
                                            <ul>
                                                {data.achievements.map((achievement, i) =>
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
