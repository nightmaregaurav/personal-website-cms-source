import React from 'react';
import './index.scss';
import {getConfig} from "../../../helpers/config_helper";
import {get} from "../../../helpers/object_helper";

const Contact = () => {
    const config = getConfig();

    const send = (e) => {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
        let submit = document.getElementById("submit-btn");
        submit.disabled = true;

        fetch('https://api.ipify.org?format=json', {method: 'GET'}).then((response) => {
            return response.json().then((data) => {
                let ip = data.ip;
                let endpoint = get(config, "messageAPI", "");
                if(endpoint !== "") {
                    let data = {
                        name: name,
                        email: email,
                        message: message,
                        ip: ip
                    }
                    fetch(endpoint, {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    }).then(() => {
                        submit.innerText = "Sent!"
                        setTimeout(() => {
                            name.value("");
                            email.value("");
                            message.value("");
                            submit.disabled = false;
                            submit.innerText = "Send"
                        }, 1000);
                    }).catch(() => {
                        submit.innerText = "Failed!"
                        setTimeout(() => {
                            submit.disabled = false;
                            submit.innerText = "Send"
                        }, 1000);
                    });
                } else {
                    submit.innerText = "Failed!"
                    setTimeout(() => {
                        submit.disabled = false;
                        submit.innerText = "Send"
                    }, 1000);
                }
            }).catch(() => {
                submit.innerText = "Failed!"
                setTimeout(() => {
                    submit.disabled = false;
                    submit.innerText = "Send"
                }, 1000);
            });
        });
    };

    return (
        <>
            <section id="contact" className="contact">
                <div className="container">

                    <div className="section-title">
                        <h2>Contact</h2>
                        <p>Write and send messages. You can also send anonymous messages.</p>
                        {get(config, "messageAPI", "") === "" ? <span className={"badge rounded-pill bg-danger"}>Service Currently Unavailable</span>: null }
                    </div>

                    <div className="d-flex flex-row justify-content-center align-items-center align-content-center" data-aos="fade-in">
                        <div className="mt-0 d-flex align-items-stretch">
                            <form onSubmit={(e) => send(e)}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" id="name" aria-describedby="nameHelp" placeholder="Full Name (Optional)"/>
                                    <small id="nameHelp" className="form-text text-muted"></small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email (Optional)"/>
                                    <small id="emailHelp" className="form-text text-muted">I won't share your email with anyone.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" rows="10" id="message" placeholder="Write your message here..." required></textarea>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button id={"submit-btn"} className={"btn btn-success"} type={"submit"}>Send</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
};

export default Contact;
