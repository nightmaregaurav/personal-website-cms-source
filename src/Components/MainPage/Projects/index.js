import React, {useEffect, useState} from 'react';
import './index.scss';
import IsoTopeGrid from "react-isotope";
import {getConfig, getMainTitle} from "../../../helpers/config_helper";
import {Link, Outlet} from "react-router-dom";
import {get} from "../../../helpers/object_helper";
import {slugify} from "../../../helpers/text_heper";
import {getMeta} from "../../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";


const Projects = () => {
    const config = getConfig();
    const [filters, setFilters] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // noinspection DuplicatedCode
        let original_data = Object.values(get(get(config, "projects", {}), "contents", {}));
        // noinspection JSUnresolvedVariable
        let new_data = original_data.map((item, index) =>({
            id: "id_" + index,
            title: item.title,
            image: Object.values(item.imagesUrl).length > 0 ? Object.values(item.imagesUrl)[0]: null,
            categories: Object.values(item.categories),
            filter: Object.values(item.categories).length > 0 ? Object.values(item.categories).map(i => "filter-" + slugify(i)) : [],
        }));

        let labels = [];
        let categories = [];
        new_data.map(item => {
            labels = [...labels, ...item.filter];
            categories = [...categories, ...item.categories];
            return null;
        });
        labels = [...new Set(labels)];
        let filter_data = labels.map((_, index) => {return {label: labels[index], name:categories[index], isChecked: false}});
        filter_data.unshift({ label: "all", name:"all", isChecked: true });

        setData(new_data);
        setFilters(filter_data);
    }, [null]);

    const update_filter = label => {
        setFilters(state =>
            state.map(f => {
                if (f.label === label) {
                    return {
                        ...f,
                        isChecked: true
                    };
                } else {
                    return {
                        ...f,
                        isChecked: false
                    };
                }
            })
        );
    };

    const page_title = `Projects - ${getMainTitle()}`;
    const page_description = get(get(config, "projects", {}), "intro", "");
    const page_image = "";

    return (
        <>
            <Helmet>
                <title>{page_title}</title>
                {getMeta(page_title, page_description, page_image)}
            </Helmet>

            {get(config, 'projects', null) ? <>
                {(get(get(config, 'projects', null), "intro", "") !== "" || Object.values(get(get(config, 'projects', null), "contents", {})).length > 0) ? <>
                    <Outlet/>
                    <section id="projects" className="projects section-bg">
                        <div className="container">
                            <div className="section-title">
                                <h2>Projects</h2>
                                <p>{get(get(config, "projects", {}), "intro", "")}</p>
                            </div>
                            {Object.values(get(get(config, 'projects', null), "contents", {})).length > 0 ? <>
                                <div className="row" data-aos="fade-up">
                                    <div className="col-lg-12 d-flex justify-content-center">
                                        <ul id="projects-filters">
                                            {filters.map((filter, i) => <li key={i} className={filter.isChecked ? "filter-active" : null} onClick={() => update_filter(filter.label)}>{filter.name}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="projects-container" data-aos="fade-up" data-aos-delay="100">
                                    {data.length > 0 ? <IsoTopeGrid
                                        gridLayout={data}
                                        filters={filters}
                                        unitWidth={0}
                                        unitHeight={0}
                                        noOfCols={1}
                                    >
                                        {data.map(item => (
                                            <div key={item.id} className={"projects-card " + item.filter.join(" ")}>
                                                <div className="card bg-dark text-white">
                                                    <img className="card-img projects-card-image" src={item.image} alt={item.title.trim() + "'s photo"} />
                                                    <div className="card-img-overlay d-flex flex-column flex-nowrap justify-content-center align-items-center">
                                                        <h5 className="card-title text-center">{item.title}</h5>
                                                        <Link className="view-btn card-text btn btn-success" to={item.id}><i className={"bi-eye-fill"}></i> View</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </IsoTopeGrid> : null}
                                </div>
                            </> : null }
                        </div>
                    </section>
                </> : null}
            </> : null }
        </>
    );
};

export default Projects;
