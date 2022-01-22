require('dotenv').config();
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

class EmailActions {
    sendEmail(req, res) {
        var users = req.body.users;
        for (var i = 0; i < users.length; i++) {
            var data = users[i];
            const msg = {
                template_id: process.env.SENDGRID_TEMPLATE_ID,
                from: "ministryplannerteam@gmail.com",
                personalizations: [{
                    to: { email: data.recipient.email },
                    dynamic_template_data: {
                        event_name: data.eventName,
                        event_date: data.eventDate,
                        recipient_name: data.recipient.name,
                        sender_name: data.sender.name
                    },
                }],
            }

            sendgrid
                .send(msg)
                .catch((err) => {
                    res.status(400).send(err.message);
                    return;
                })
        }
        res.status(200).send("Emails sent successfully");
    };

}

export default new EmailActions();