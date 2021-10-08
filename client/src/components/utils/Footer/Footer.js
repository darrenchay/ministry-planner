import React from "react";
import "./Footer.scss"
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import {
    Typography,
    Divider
} from '@material-ui/core';

export default function Footer() {
    return (
        <>
            <div className="footer-wrapper">
                <Divider variant="middle" className="divider" />
                <div className="info">
                    <HomeIcon className="icons" />
                    <div className="text">31 Magon Street, Plaine Verte, Port Louis, MAURITIUS</div>
                </div>

                <div className="info">
                    <PhoneIcon className="icons" />
                    <div className="text">(+230) 242 1120 / (+230) 242 1119</div>
                </div>

                <div className="info">
                    <LanguageIcon className="icons" />
                    <a href="https://stpaulmauritius.church">stpaulmauritius.church</a>
                </div>

                <div className="info">
                    <EmailIcon className="icons" />
                    <div className="text">stpaulpv@gmail.com</div>
                </div>

                <Typography variant="caption" color="inherit" className="copyright">
                    © {new Date().getFullYear()} Wazaza Team
                </Typography>

            </div>
        </>
    );
}