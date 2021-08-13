import express from 'express';

import eventSchema from '../schemas/event-schema';
import resourceSchema from '../schemas/resource-schema';
import worshipEventDetailsSchema from '../schemas/worship-event-details-schema';

class PlannerPageActions {
    //Get all events by type, then retrieve all specific event details, then add that as one property in the events object
    getAll(req, res) {
        (async () => {
            try {
                // Retrieving all events
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

                var eventList = [];
                var promises = []; //Will save the list of all promises to execute

                // Adding event details to each event
                for (var i = 0; i < events.length; i++) {
                    const event = events[i];
                    // Creating promise to find event details for each event
                    promises.push(new Promise((resolve, reject) => {
                        worshipEventDetailsSchema.find({
                            eventId: event.id
                        }).populate({
                            path: 'teamList',
                            populate: {
                                path: 'teamMember',
                                model: 'User'
                            }
                        })
                        .exec(function (err, worshipDetails) {
                            if (worshipDetails != '') {
                                var fullEvent = {}; //Creating a new variable to store the data
                                fullEvent.event = event;
                                fullEvent.eventDetails = worshipDetails[0];
                                eventList.push(fullEvent);
                            } else {
                                console.log("worship details not found");
                            }
                            resolve();
                        });
                        // worshipEventDetailsSchema.find({
                        //     eventId: event.id
                        // }, function (err, worshipDetails) {
                        //     if (worshipDetails != '') {
                        //         var fullEvent = {}; //Creating a new variable to store the data
                        //         fullEvent.event = event;
                        //         fullEvent.eventDetails = worshipDetails[0];
                        //         eventList.push(fullEvent);
                        //     } else {
                        //         console.log("worship details not found");
                        //     }
                        //     resolve();
                        // });
                    }));
                }
                Promise.all(promises).then(function () {
                    res.status(200).send(eventList);
                });

            } catch (err) {
                console.log(err.details);
                res.status(400).send(err);
            }
        })();
    }

    //Save a new full event (e.g a new worship event)

    //Delete an event
}

export default new PlannerPageActions();
