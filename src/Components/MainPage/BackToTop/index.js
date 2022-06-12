import React from 'react';
import './index.scss';

const BackToTop = () => {
    const toggleBackToTop = () => {
        const backToTop = document.querySelector('.back-to-top');
        if(backToTop) {
            if (window.scrollY > 100) {
                backToTop.classList.add('active')
            } else {
                backToTop.classList.remove('active')
            }
        }
    }

    window.addEventListener('load', toggleBackToTop)
    document.addEventListener('scroll', toggleBackToTop)

    return (
        <>
            <span className={"back-to-top d-flex align-items-center justify-content-center"}><i className="bi bi-arrow-up-short"></i></span>
        </>
    );
};

export default BackToTop;
