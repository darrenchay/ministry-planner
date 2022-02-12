require('dotenv').config();
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

class EmailActions {
    notifyUsers(req, res) {
        var users = req.body.users;
        for (var i = 0; i < users.length; i++) {
            var data = users[i];
            const msg = {
                template_id: process.env.SENDGRID_CONFIRM_EVENT_TEMPLATE_ID,
                from: "ministryplannerteam@gmail.com",
                personalizations: [{
                    to: { email: data.recipient.email },
                    dynamic_template_data: {
                        event_name: data.eventName,
                        event_date: data.eventDate,
                        recipient_name: data.recipient.name,
                        sender_name: data.sender.name,
                        hostIP: process.env.NODE_ENV === 'production' ? "http://localhost:8080" : "https://ministry-planner-server.herokuapp.com/api/",
                        eventId: data.eventId,
                        userId: data.recipient.id
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

    authNewUser(req, res) {
        var data = req.body.data;
        const msg = {
            template_id: process.env.SENDGRID_AUTH_NEW_USER_TEMPLATE_ID,
            from: "ministryplannerteam@gmail.com",
            personalizations: [{
                to: { email: data.recipient.email },
                dynamic_template_data: {
                    recipient_name: data.recipient.name,
                    email: data.email,
                    hostIP: process.env.NODE_ENV === 'production' ? "http://localhost:8080" : "https://ministry-planner-server.herokuapp.com/api/",
                    // hostIP: "http://localhost:8080",
                    userID: data.userId
                },
            }],

        }
        sendgrid
            .send(msg)
            .catch((err) => {
                res.status(400).send(err.message);
                return;
            })
        res.status(200).send("Email sent successfully");
    }

    approveConfimation(req, res) {
        var data = req.body.data;
        const msg = {
            template_id: process.env.SENDGRID_APPROVAL_USER_TEMPLATE_ID,
            from: "ministryplannerteam@gmail.com",
            personalizations: [{
                to: { email: data.recipient.email },
            }],

        }
        sendgrid
            .send(msg)
            .catch((err) => {
                res.status(400).send(err.message);
                return;
            })
        res.status(200).send("Email sent successfully");
    }
}

export default new EmailActions();