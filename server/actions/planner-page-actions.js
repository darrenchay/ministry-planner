import express from 'express';

import eventSchema from '../schemas/event-schema';
import resourceSchema from '../schemas/resource-schema';
// import userSchema from '../schemas/user-schema';
import worshipOnDutySchema from '../schemas/worship-on-duty-schema';

class PlannerPageActions {
    //Get all events by type, then retrieve all specific event details, then add that as one property in the events object
    getAll(req, res) {
        // (async function () {
        //     try {
        //         await eventSchema.find({
        //             type: req.params.type
        //         }).then(events => {
        //             console.log(events);
        //             events.forEach(event => {
        //                 console.log(event);
        //                 await worshipOnDutySchema.find({
        //                     eventId: event.id
        //                 }, function (err, worshipDetails) {
        //                     console.log("worship details: ");
        //                     console.log(worshipDetails);
        //                     event.worshipDetails = worshipDetails;
        //                 });
        //             })
        //             res.status(200).send(events);
        //         });
        //     } catch (err) {
        //         console.log(err.details);
        //         res.status(400).send(err);
        //     }
        // })();
        var events;
        (async function () {
            try {
                events = await new Promise((resolve, reject) => {
                    eventSchema.find({
                        type: req.params.type
                    }, function (err, events) {
                        if (err) {
                            res.status(400).send(err.errmsg);
                        } else {
                            events.forEach(event => {
                                var worshipDetails1 = new Promise((resolve, reject) => {
                                    worshipOnDutySchema.find({
                                        eventId: event.id
                                    }, function (err, worshipDetails) {
                                        console.log("worship details: ");
                                        console.log(worshipDetails);
                                        resolve(worshipDetails)
                                    });
                                })
                                event.worshipDetails = worshipDetails1;
                            });
                            resolve(events);
                        }
                    });
                });

                // console.log(events);
                // var worshipDetails;
                // events.forEach(event => {
                //     worshipDetails = new Promise((resolve, reject) => {
                //         worshipOnDutySchema.find({
                //             eventId: event.id
                //         }, function (err, worshipDetails) {
                //             console.log("worship details: ");
                //             console.log(worshipDetails);
                //             resolve(worshipDetails)
                //         });
                //     })
                //     event.worshipDetails = worshipDetails;
                // });

                console.log(events);

                res.status(200).send(events);

            } catch (err) {
                console.log(err.details);
                res.status(400).send(err);
            }
        })();

        // eventSchema.find({
        //     type: req.params.type
        // }, function (err, events) {
        //     var events1 = events;
        //     console.log(events1);
        //     for (var i = 0; i < events1.length; i++) {
        //         worshipOnDutySchema.find({
        //             eventId: events1[i].id
        //         }, function (err, worshipDetails) {
        //             console.log("worship details: ");
        //             console.log(worshipDetails);
        //             events1[i].worshipDetails = worshipDetails;
        //         });

        //         resourceSchema.find({
        //             eventId: events1[i].id
        //         }, function (err, resourceDetails) {
        //             console.log("resource details: ");
        //             console.log(resourceDetails);
        //             events1[i].resourceDetails = resourceDetails;
        //         });
        //     }
        //     // events1.forEach(testEvent => {
        //     //     var event = testEvent;
        //     //     var eventDetailsId = event.eventDetailsId;

        //     //     worshipOnDutySchema.find({
        //     //         eventId: eventDetailsId
        //     //     }, function (err, worshipDetails) {
        //     //         console.log("worship details: ");
        //     //         console.log(worshipDetails);
        //     //         event.worshipDetails = worshipDetails;
        //     //     });

        //     //     resourceSchema.find({
        //     //         eventId: eventDetailsId
        //     //     }, function (err, resourceDetails) {
        //     //         console.log("resource details: ");
        //     //         console.log(resourceDetails);
        //     //         event.resourceDetails = resourceDetails;
        //     //     });
        //     // });
        //     console.log("full details: ");
        //     console.log(events1);
        // });

        // Adding details to event


    }

    //Save a new full event (e.g a new worship event)

    //Delete an event
}

export default new PlannerPageActions();
