import React from 'react';
import './index.scss';
import {get} from "../../../helpers/object_helper";
import {useConfig} from "../../../helpers/config_helper";
import {LightgalleryProvider, LightgalleryItem, useLightgallery} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

const LightboxViewButton = ({pic_id, group}) => {
    const { openGallery } = useLightgallery();
    return <span className="card-text btn btn-success" onClick={() => openGallery(group, pic_id)}><i className={"bi-eye-fill"}></i> View</span>;
};

const Gallery = () => {
    const config = useConfig();
    return (
        <>
            <section id="gallery" className="gallery section-bg">
                <div className="container">
                    <div className="section-title">
                        <h2>Gallery</h2>
                    </div>
                </div>
                <div className={"container d-flex flex-row flex-wrap justify-content-center align-content-center align-items-center"}>
                    <LightgalleryProvider>
                        {get(config, "gallery", []).map((item, i) => (
                            <div key={i} className={"gallery-card"}>
                                <div className="card bg-dark text-white">
                                    <LightgalleryItem group="all" src={item.url} />
                                    <img className="card-img gallery-card-image" src={item.url} alt={item.name} />
                                    <div className="card-img-overlay d-flex flex-column flex-nowrap justify-content-center align-items-center">
                                        <h5 className="card-title">{item.name}</h5>
                                        <LightboxViewButton pic_id={i} group={"all"} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </LightgalleryProvider>
                </div>
            </section>
        </>
    );
};

export default Gallery;
