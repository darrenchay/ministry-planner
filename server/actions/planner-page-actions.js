import express from 'express';

import eventSchema from '../schemas/event-schema';
import resourceSchema from '../schemas/resource-schema';
// import userSchema from '../schemas/user-schema';
import worshipOnDutySchema from '../schemas/worship-on-duty-schema';

class PlannerPageActions {
    //Get all events by type, then retrieve all specific event details, then add that as one property in the events object
     getAll(req, res) {
        let eventList = [];
        (async function () {
            try {
                await eventSchema.find({
                    type: req.params.type
                }).then(events => {
                    console.log(events);
                    let fullEvent = {
                        event: {},
                        eventDetails: {},
                        resources: {}
                    }
                    /* (async function () {
                        await Promise.all(events.map(async (event) => {
                            fullEvent.event = event;
                            const worshipDetails = await new Promise((resolve, reject) => {
                                worshipOnDutySchema.find({
                                    eventId: event.id
                                }, function (err, worshipDetails) {
                                    console.log("worship details: ");
                                    console.log(worshipDetails);
                                    resolve(worshipDetails)
                                });
                            })
                            fullEvent.eventDetails = worshipDetails[0];
                            eventList.push(fullEvent);
                            console.log("HERE:");
                            console.log(eventList);
                            event.eventDetails = worshipDetails[0];
                        }));
                    })(); */
                    
                    for (const event of events) {
                        console.log("iterating over event: ")
                        console.log(event);
                        (async function () {
                            fullEvent.event = event;
                            console.log("eventID: " + event.id);
                            let worshipDetails = await new Promise((resolve, reject) => {
                                worshipOnDutySchema.find({
                                    eventId: event.id
                                }, function (err, worshipDetails) {
                                    console.log("worship details: ");
                                    console.log(worshipDetails);
                                    resolve(worshipDetails)
                                });
                            })
                            fullEvent.eventDetails = worshipDetails[0];
                            eventList.push(fullEvent);
                            console.log("HERE:");
                            console.log(eventList);
                        })();
                    }
                    console.log("End");
                    console.log(events);
                    res.status(200).send(events);
                });
            } catch (err) {
                console.log(err.details);
                res.status(400).send(err);
            }
        })();

        /* (async function () {
            try {
                var events = await new Promise((resolve, reject) => {
                    eventSchema.find({
                        type: req.params.type
                    }, function (err, events) {
                        if (err) {
                            res.status(400).send(err.errmsg);
                        } else {
                            resolve(events);
                        }
                    });
                });

                console.log(events);
                var worshipDetails;

                await events.reduce(async (memo, event) => {
                    await memo;
                    console.log("here");
                    console.log(event);
                    console.log("event ID: " + event.id);
                    fullEvent.event = event;
                    const worshipDetails = await new Promise((resolve, reject) => {
                        worshipOnDutySchema.find({
                            eventId: event.id
                        }, function (err, worshipDetails) {
                            console.log("worship details: ");
                            console.log(worshipDetails);
                            resolve(worshipDetails)
                        });
                    })
                    fullEvent.eventDetails = worshipDetails[0];
                    eventList.push(fullEvent);
                    console.log("HERE:");
                    console.log(eventList);
                    event.eventDetails = worshipDetails[0];
                })
                // await Promise.all(events.map(async (event) => {
                    
                // }));
                *//* events.forEach(event => {
                    (async function () {
                        worshipDetails = new Promise((resolve, reject) => {
                            worshipOnDutySchema.find({
                                eventId: event.id
                            }, function (err, worshipDetails) {
                                console.log("worship details: ");
                                console.log(worshipDetails);
                                resolve(worshipDetails)
                            });
                        })
                        event.worshipDetails = worshipDetails;
                    })();
                }); *//*

                console.log("At the end");
                console.log(events);
                console.log("EventList Data: ");
                console.log(eventList);
                res.status(200).send(events);

            } catch (err) {
                console.log(err.details);
                res.status(400).send(err);
            }
        })(); */


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
