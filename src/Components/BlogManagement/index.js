import React, {useEffect, useState} from 'react';
import "./index.scss";
import SmartImg from "../SmartImg";
import {useNavigate} from "react-router-dom";
import {getMeta} from "../../helpers/seo_helper";
import {Helmet} from "react-helmet-async";

const BlogManagement = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems([{
            Title: "Blog 1",
            LastUpdate: "2021-01-01",
            Image: "https://picsum.photos/200/300",
            ViewLink: "/blog/1",
            EditLink: "/setup/manage-blogs/edit/1",
            DeleteLink: "/setup/manage-blogs/delete/1"
        }]);
    }, []);

    return (<>
        <Helmet>
            {getMeta("Blog Management", "Manage your blogs",)}
        </Helmet>

        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center"} style={{height: "100vh", width: "100vw"}}>
            <h1 className={"mb-2"}>Blog Management</h1>
            <div className={"container d-flex flex-column justify-content-center align-items-center"}>
                {items.map((item, index) => <div key={index} className={"d-flex p-2 m-2 justify-content-start align-items-center"} style={{width: "100%", backgroundColor: "#e8e8e8", borderRadius: "10px"}}>
                    <div className={"mt-1 mb-1 me-1 ms-2"}>
                        <SmartImg src={item.Image} alt={item.Title} previewText={"No Image"} height={"60px"} width={"100px"} />
                    </div>
                    <div className={"p-2 m-2"}>
                        <div className={"text-secondary"}>
                            <h5><b>
                                {item.Title}
                            </b></h5>
                        </div>
                        <small className={"text-muted"}>Last Update: {item.LastUpdate}</small>
                    </div>
                    <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center p-2 m-2 ms-auto"}>
                        <span className={"p-1 m-1 btn btn-sm btn-primary"} onClick={() => navigate(item.ViewLink)}><i className={"bi-eye-fill"}/> View </span>
                        <span className={"p-1 m-1 btn btn-sm btn-info"} onClick={() => navigate(item.EditLink)}><i className={"bi-vector-pen"}/> Edit </span>
                        <span className={"p-1 m-1 btn btn-sm btn-danger"} onClick={() => navigate(item.DeleteLink)}><i className={"bi-eye-fill"}/> Delete </span>
                    </div>
                </div>)}
            </div>
        </div>
        </>);
};

export default BlogManagement;
