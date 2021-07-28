import express from 'express';

import eventSchema from '../schemas/event-schema';
import resourceSchema from '../schemas/resource-schema';
// import userSchema from '../schemas/user-schema';
import worshipOnDutySchema from '../schemas/worship-on-duty-schema';

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
                console.log("here after event function");
                console.log(events);
                var eventList = [];
                var promises = []; //Will save the list of all promises to execute

                // Adding event details to each event
                for (var i = 0; i < events.length; i++) {
                    const event = events[i];
                    // Creating promise for each event
                    promises.push(new Promise((resolve, reject) => {
                        console.log("Creating promise for:" + event.id);
                        worshipOnDutySchema.find({
                            eventId: event.id
                        }, function (err, worshipDetails) {
                            if(worshipDetails != '') {
                                var fullEvent = {}; //Creating a new variable to store the data
                                // console.log("All details before adding them to custom object")
                                // console.log("worship details: ");
                                // console.log(worshipDetails);
                                // console.log("event details: ");
                                // console.log(tempEvent);
                                // console.log("eventList before adding");
                                // console.log(eventList);

                                fullEvent.event = event;
                                fullEvent.eventDetails = worshipDetails[0];
                                // console.log("fullEvent before adding");
                                // console.log(fullEvent);
                                eventList.push(fullEvent);
                            } else {
                                console.log("worship details not found");
                            }
                            resolve();
                        });
                    }));
                }          
                Promise.all(promises).then(function() {
                    console.log("EventList Data: ");
                    console.log(eventList);
                    res.status(200).send(eventList);    
                });

            } catch (err) {
                console.log(err.details);
                res.status(400).send(err);
            }
            })();

        // Adding details to event
    }

    //Save a new full event (e.g a new worship event)

    //Delete an event
}

export default new PlannerPageActions();
