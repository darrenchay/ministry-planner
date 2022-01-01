import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from "axios";
import EmailKey from './EmailKey';

const url = 'https://api.emailjs.com/api/v1.0/email/send-form'

const sendEmail = (user, service_details, service_name) => {
    const form = useRef();
    var emailData = {
        service_id: EmailKey.SERVICE_ID,
        template_id: EmailKey.TEMPLATE_ID,
        user_id: EmailKey.USER_ID,
        recipient: user.email,
        to_name: user.firstname,
        service_details: service_details,
        service_name: service_name
    }
    
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  
    return (
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    );
  };
    // var data = new FormData();
    // Object.keys(emailData).forEach(key => data.append(key, emailData[key]));
    // data = JSON.stringify(emailData);
    // console.log(data);
    // /* axios({
    //     method: 'POST',
    //     url: url,
    //     headers: { 'content-type': 'application/json' },
    //     body: emailData
    // })
    //     .then((data) => {
    //         console.log("Email Successfully sent");
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         throw err;
    //     }) */

    // var data = (<form ref={form} onSubmit={sendEmail}>
    //     <input type="text" name="user_name" />
    //     <input type="email" name="user_email" />
    //     <textarea name="message" />
    //     <input type="submit" value="Send" />
    // </form>)
    // return emailjs.sendForm(EmailKey.SERVICE_ID, EmailKey.TEMPLATE_ID, data, EmailKey.USER_ID)
    //     .then((result) => {
    //         console.log("Notified ", result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });
// };

export default sendEmail;