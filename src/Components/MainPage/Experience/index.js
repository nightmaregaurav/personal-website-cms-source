import React from 'react';
import './index.scss';
import {get} from "../../../helpers/object_helper";
import {useConfig} from "../../../helpers/config_helper";

const Experience = () => {
    const config = useConfig();

    // noinspection JSUnresolvedVariable
    return (
        <>
            <section id="experience" className="experience">
                <div className="container">
                    <div className="section-title">
                        <h2>Experience</h2>
                        <p>{get(get(config, "experience", {}), "intro", "")}</p>
                    </div>
                    <div>
                        <div data-aos="fade-up">
                            <h3 className="experience-title">Timeline</h3>
                            {get(get(config, "experience", {}), "timeline", []).map((data, i) =>
                                <div key={i} className="experience-item">
                                    <span>
                                        {data.title? <h4 style={{display: "inline"}}>{data.title}</h4> : null}
                                        {data.from || data.to ? <h5 className={"ms-3"} style={{display: "inline"}}>{data.from ? data.from : null} {data.from && data.to ? "-" : null} {data.to ? data.to : null}</h5> : null}
                                    </span>
                                    {data.organization ? <p><em><a style={{textDecoration: "none", color:"inherit"}} href={data.organizationUrl??"#"}>{data.organization}</a></em></p> : null}
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default Experience;
