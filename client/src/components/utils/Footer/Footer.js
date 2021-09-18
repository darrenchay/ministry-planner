import React from "react";
import Grid from '@material-ui/core/Grid';
import "./Footer.scss"
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';

export default function Footer() {
  return (
    <div className="footer-wrapper">
      {/*
      <Grid container direction="row" alignItems="center">

        <HomeIcon />
        31 Magon Street, Plaine Verte, Port Louis, MAURITIUS

      </Grid>

      <Grid container direction="row" alignItems="center">

        <EmailIcon style={{ fontSize: 22 }} />
        stpaulpv@gmail.com

      </Grid>

      <Grid container direction="row" alignItems="center">

        <PhoneIcon style={{ fontSize: 23 }} />
        (+230) 242 1120 / (+230) 242 1119

      </Grid>
      */}

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

    </div>
  );
}