import React, {useEffect} from "react";
import './index.scss';

const Footer = () => {
    useEffect(() => {
        document.getElementById("main-footer").innerHTML = (
            "© " +
            new Date().getFullYear() +
            " " +
            decodeURIComponent(escape(atob('Q3JlYXRlZCB1c2luZyA8YSBocmVmPSJodHRwczovL2dpdGh1Yi5jb20vbmlnaHRtYXJlZ2F1cmF2L3BlcnNvbmFsLXdlYnNpdGUtY21zIiBjbGFzcz0ibWFpbi1mb290ZXItbGluayI+UGVyc29uYWwtV2Vic2l0ZS1DTVM8L2E+LiBQcm92aWRlZCB3aXRoIPCflqQgYnkgPGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL25pZ2h0bWFyZWdhdXJhdiIgY2xhc3M9Im1haW4tZm9vdGVyLWxpbmsiPkdhdXJhdiBOeWF1cGFuZTwvYT4=')))
        );
        return () => {};
    }, []);

    return (
        <>
            <footer style={{width: "100%", textAlign: "center", color:"gray"}}>
                <small id={"main-footer"}>
                </small>
            </footer>
        </>
    );
}

export default Footer;