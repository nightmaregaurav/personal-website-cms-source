import React from 'react';
import './index.scss';
import {getConfig} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";

const Skills = () => {
    const config = getConfig();

    return (
        <>
            {get(config, 'skills', null) ? <>
                {(get(get(config, 'skills', null), "intro", "") !== "" || Object.values(get(get(config, 'skills', null), "contents", {})).length > 0) ? <section id="skills" className="skills section-bg">
                    <div className="container">
                        <div className="section-title">
                            <h2>Skills</h2>
                            <p>{get(get(config, "skills", {}), "intro", "")}</p>
                        </div>
                        {Object.values(get(get(config, 'skills', null), "contents", {})).length > 0 ? <div className="row skills-content">
                            <div className="col-lg-6" data-aos="fade-up">
                                {Object.values(get(get(config, "skills", {}), "contents", {})).map((skill, index) => {
                                    // noinspection JSUnresolvedVariable
                                    return ((index+1) % 2 !== 0) ?
                                        <div key={index} className="progress">
                                            <span className="skill">{skill.title} <i className="val">{skill.percentage ?? "0"}%</i></span>
                                            <div className="progress-bar-wrap progress">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: (skill.percentage ?? "0") + "%"}} aria-valuenow={skill.percentage ?? "0"} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    : null;
                                })}
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                {Object.values(get(get(config, "skills", {}), "contents", {})).map((skill, index) => {
                                    // noinspection JSUnresolvedVariable
                                    return ((index+1) % 2 === 0) ?
                                        <div key={index} className="progress">
                                            <span className="skill">{skill.title} <i className="val">{skill.percentage ?? "0"}%</i></span>
                                            <div className="progress-bar-wrap progress">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: (skill.percentage ?? "0") + "%"}} aria-valuenow={skill.percentage ?? "0"} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    : null;
                                })}
                            </div>
                        </div> : null }
                    </div>
                </section> : null }
            </> : null }
        </>
    );
};

export default Skills;
