import React, {useEffect, useState} from 'react';
import './index.scss';
import {useParams} from "react-router-dom";
import FullPageOverlay from "../../../FullPageOverlay";
import {useConfig} from "../../../../helpers/config_helper";
import {get} from "../../../../helpers/object_helper";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/scss";
import "swiper/scss/pagination";

const View = () => {
    let { id } = useParams();
    const config = useConfig();
    SwiperCore.use([Pagination]);
    const [target, setTarget] = useState({});

    useEffect(() => {
        // noinspection DuplicatedCode
        let original_data = get(get(config, "projects", {}), "contents", []);
        // noinspection JSUnresolvedVariable
        let data = original_data.map(item => ({
            title: item.title,
            images: item.imagesUrl,
            description: item.description,
            majorPoints: item.majorPoints,
            links: item.extLinks,
        }));
        let index = id.split("_")[1] ?? NaN;
        setTarget(data[index] ?? null);
    } , [config, id]);

    return (
        <FullPageOverlay content={<>
            {target ?<>
                <section id="projects-details" className="projects-details" style={{overflow: "auto", maxHeight: "90vh"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 d-flex flex-row flex-nowrap justify-content-center align-items-center align-content-center">
                                <Swiper slidesPerView={1} spaceBetween={8} initialSlide={0} centeredSlides={true} pagination={{clickable: true}}>
                                    {target.images ? target.images.map((image, i) =>
                                        <SwiperSlide key={i}>
                                            <img className={"swipe-image"} src={image} alt={"Project's image " + i} />
                                        </SwiperSlide>
                                        ) : null}
                                </Swiper>
                            </div>
                            <div className="col-lg-5 d-flex flex-column flex-nowrap justify-content-center align-items-start align-content-center">
                                <div className="projects-info">
                                    {target.majorPoints ? <>
                                        <h3 style={{margin: 0, padding: 0, marginBottom: "10px", paddingBottom: "5px"}}>Project information</h3>
                                        <ul>
                                            {target.majorPoints.map((point, i) => <li key={i}><strong>{point.title}</strong>{": " + point.info}</li>)}
                                        </ul>
                                        {target.links.length > 0 ? <>
                                            <h3 style={{margin: 0, padding: 0, marginBottom: "10px", paddingBottom: "5px"}}>External Links</h3>
                                            <span className={"text-center"}>
                                                {target.links ? target.links.map((link, i) => <a key={i} href={link.url} target={"_blank"} className={"btn badge rounded-pill bg-primary m-1 p-1"}>{link.title}</a>) : null}
                                            </span>
                                        </>: null}
                                    </>: null}
                                </div>
                                <div className="projects-description">
                                    <h2>{target.title}</h2>
                                    <p>{target.description}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </> : "Opps! Something went wrong"}
        </>} sourcePageUrl={"/projects"} />
    );
};

export default View;
