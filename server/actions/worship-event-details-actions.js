import WorshipEventDetails from '../schemas/worship-event-details-schema';
import User from '../schemas/user-schema';
const mongoose = require('mongoose');

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
        WorshipEventDetails.find({ id: req.params.id })
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
        WorshipEventDetails.updateOne({ id: req.params.id }, req.body, function (err, worshipEventDetails) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (worshipEventDetails.n == 0)
                res.status(404).send("worshipEventDetails '" + req.params.id + "' not found");
            else
                res.status(200).send(worshipEventDetails);
        });
    }

    deleteOne(req, res) {
        WorshipEventDetails.deleteOne({ id: req.params.id }, function (err, worshipEventDetails) {
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
