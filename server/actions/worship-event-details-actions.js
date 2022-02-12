import WorshipEventDetails from '../schemas/worship-event-details-schema';

class WorshipOnDutyActions {
    addOne(req, res) {
        var worshipEventDetails = new WorshipEventDetails(req.body);
        console.log(worshipEventDetails);

        worshipEventDetails.save(function (err, worshipEventDetails) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send(worshipEventDetails);
            }
        });
    }

    getAll(req, res) {
        WorshipEventDetails.find({})
            .populate({
                path: 'teamList',
                populate: {
                    path: 'teamMember',
                    model: 'User'
                }
            })
            .exec(function (err, worshipEventDetails) {
                if (err)
                    res.status(400).send(err.message);
                else
                    res.status(200).send(worshipEventDetails);
            });
    }

    getOne(req, res) {
        WorshipEventDetails.find({ _id: req.params.id })
            .populate({
                path: 'teamList',
                populate: {
                    path: 'teamMember',
                    model: 'User'
                }
            })
            .exec(function (err, worshipEventDetails) {
                if (err)
                    res.status(400).send(err.message);
                else
                    res.status(200).send(worshipEventDetails);
            });
    }

    updateOne(req, res) { // for all other fields that's not an array
        WorshipEventDetails.updateOne({ _id: req.params.id }, req.body, function (err, worshipEventDetails) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (worshipEventDetails.n == 0)
                res.status(404).send("worshipEventDetails '" + req.params.id + "' not found");
            else
                res.status(200).send(worshipEventDetails);
        });
    }

    updateRole(req, res) { //Updating a team member (role) in the team list
        WorshipEventDetails.updateOne(
            {
                "teamList._id": req.params.id
            },
            {
                "$set": {
                    "teamList.$": req.body
                }
            },
            function (err, worshipEventDetails) {
                if (err) {
                    res.status(400).send(err);
                } else if (worshipEventDetails.n == 0) {
                    res.status(404).send("Role " + req.body.roleId + " not successfully updated");
                } else {
                    res.status(200).send(worshipEventDetails);
                }
            })
    }

    updateUserStatus(req, res) {
        WorshipEventDetails.updateOne(
            {
                "_id": req.params.eventDetailsId,
            },
            {
                "$set": {
                    "teamList.$[].teamMapping.$[user].status": req.params.status
                }
            },
            {
                arrayFilters: [
                    {
                        "user.memberId": {
                            "$eq": req.params.id
                        },
                    }

                ]

            },
            function (err, worshipEventDetails) {
                if (err) {
                    res.status(400).send(err);
                } else if (worshipEventDetails.n == 0) {
                    res.status(404).send("Status " + req.body.roleId + " not successfully updated");
                } else {
                    res.status(200).send(worshipEventDetails);
                }
            })
    }

    deleteOne(req, res) {
        WorshipEventDetails.deleteOne({ _id: req.params.id }, function (err, worshipEventDetails) {
            if (err)
                res.status(400).send(err.errmsg)
            else if (worshipEventDetails.n == 0)
                res.status(404).send("worshipEventDetails '" + req.params.id + "' not found");
            else
                res.status(200).send('deleted');
        });
    }

    deleteAll(req, res) {
        WorshipEventDetails.deleteMany({}, function (err) {
            if (err)
                res.status(400).send(err.errmsg);
            else
                res.status(200).send('deleted');
        });
    }
}

export default new WorshipOnDutyActions();
