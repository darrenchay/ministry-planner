var eventPromise = await new Promise((resolve, reject) => {
    eventSchema.find({
        type: req.params.type
    }, function (err, events) {
        if (err) {
            res.status(400).send(err.errmsg);
        } else {
            events.forEach(event => {
                tempEventList.push(event);
            })
            resolve();
        }
    });
});

        /* (async function () {
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
                      (async function () {
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
                            })(); 
                         
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
                 
                 
                 for (const event of events) {
                            console.log("iterating over event: ")
                            console.log(event);
                            fullEvent.event = event;
                            console.log("eventID: " + event.id);
                            let worshipDetails = new Promise((resolve, reject) => {
                                worshipOnDutySchema.find({
                                    eventId: event.id
                                }, function (err, worshipDetails) {
                                    console.log("worship details: ");
                                    console.log(worshipDetails);
                                    resolve(worshipDetails)
                                });
                            });

                            var thenedEventDetails = worshipDetails.then(function () {
                                fullEvent.eventDetails = worshipDetails[0];
                                eventList.push(fullEvent);
                                console.log("HERE:");
                                console.log(eventList);
                            });

                            await thenedEventDetails;

                        }
                 */
 // await events.reduce(async (memo, event) => {
                    //     await memo;
                    //     console.log("here");
                    //     console.log(event);
                    //     console.log("event ID: " + event.id);
                    //     fullEvent.event = event;
                    //     const worshipDetails = await new Promise((resolve, reject) => {
                    //         worshipOnDutySchema.find({
                    //             eventId: event.id
                    //         }, function (err, worshipDetails) {
                    //             console.log("worship details: ");
                    //             console.log(worshipDetails);
                    //             resolve(worshipDetails)
                    //         });
                    //     })
                    //     fullEvent.eventDetails = worshipDetails[0];
                    //     eventList.push(fullEvent);
                    //     console.log("HERE:");
                    //     console.log(eventList);
                    //     event.eventDetails = worshipDetails[0];
                    // })
                    // await Promise.all(events.map(async (event) => {

                    // }));
                    /* events.forEach(event => {
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
                     }); */