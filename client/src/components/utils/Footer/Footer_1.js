import React from "react";

import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Line,
} from "./FooterStyles.js";

import "./Footer.scss"
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';

export default function Footer() {
  return (
    <Box>
      <Row>
        <Column>
          {/*
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <HomeIcon />
            <span>31 Magon Street, Plaine Verte, Port Louis, MAURITIUS</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <PhoneIcon />
            <span>(+230) 242 1119 (+230) 242 1120</span>

          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <EmailIcon />
            <span>stpaulpv@gmail.com</span>
          </div>
        */}
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item>
              stpaulpv@gmail.com
            </Grid>
          </Grid>

          <FooterLink href="https://stpaulmauritius.church">Church website</FooterLink>
        </Column>
        <Column></Column>
        <Column></Column>
      </Row>
    </Box>
  );
}