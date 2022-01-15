require('dotenv').config();
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

class EmailActions {
    sendEmail(req, res) {
        var data = req.body;
        const msg = {
            template_id: process.env.SENDGRID_TEMPLATE_ID,
            from: data.sender.email, 
            personalizations: [{
                to: { email: data.recipient.email },
                dynamic_template_data: {
                    Event_Name: data.eventName,
                    Event_Date: data.eventDate,
                    recipient_name: data.recipient.name,
                    sender_name: data.sender.name
                },
            }],
        }

        sendgrid
            .send(msg)
            .then(() => {
                res.status(200).send("Email Sent Successfully");
            })
            .catch((err) => {
                res.status(400).send(err.message);
            })
    };

}

export default new EmailActions();