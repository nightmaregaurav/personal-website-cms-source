import React from "react";
import './index.scss';

const Footer = () => {
    return (
        <>
            <footer style={{width: "100%", textAlign: "center"}}>
                <small>
                    © {new Date().getFullYear()} made with <i className={"fas fa-heart"} style={{ color: 'red' }} /> by Gaurav Nyaupane
                </small>
            </footer>
        </>
    );
}

export default Footer;