import WorshipTemplate from '../schemas/worship-template-schema';

class WorshipTemplateActions {
    addOne(req, res) {
        var worshipTemplates = new WorshipTemplate(req.body);
        console.log(worshipTemplates);

        worshipTemplates.save(function (err, worshipTemplates) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send(worshipTemplates);
            }
        });
    }

    getAll(req, res) {
        WorshipTemplate.find({})
            .populate({
                path: 'teamList',
                populate: {
                    path: 'teamMember',
                    model: 'User'
                }
            })
            .exec(function (err, worshipTemplates) {
                if (err)
                    res.status(400).send(err.message);
                else
                    res.status(200).send(worshipTemplates);
            });
    }

    getOne(req, res) {
        WorshipTemplate.find({ _id: req.params.id })
            .populate({
                path: 'teamList',
                populate: {
                    path: 'teamMember',
                    model: 'User'
                }
            })
            .exec(function (err, worshipTemplates) {
                if (err)
                    res.status(400).send(err.message);
                else
                    res.status(200).send(worshipTemplates);
            });
    }

    updateOne(req, res) { // for all other fields that's not an array
        WorshipTemplate.updateOne({ _id: req.params.id }, req.body, function (err, worshipTemplates) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (worshipTemplates.n == 0)
                res.status(404).send("worshipTemplates '" + req.params.id + "' not found");
            else
                res.status(200).send(worshipTemplates);
        });
    }

    updateRole(req, res) { //Updating a team member (role) in the team list
        WorshipTemplate.updateOne(
            {
                "teamList._id": req.params.id
            },
            {
                "$set": {
                    "teamList.$": req.body
                }
            },
            function (err, worshipTemplates) {
                if (err) {
                    res.status(400).send(err);
                } else if (worshipTemplates.n == 0) {
                    res.status(404).send("Role " + req.body.roleId + " not successfully updated");
                } else {
                    res.status(200).send(worshipTemplates);
                }
            })
    }

    deleteOne(req, res) {
        WorshipTemplate.deleteOne({ _id: req.params.id }, function (err, worshipTemplates) {
            if (err)
                res.status(400).send(err.errmsg)
            else if (worshipTemplates.n == 0)
                res.status(404).send("worshipTemplates '" + req.params.id + "' not found");
            else
                res.status(200).send('deleted');
        });
    }

    deleteAll(req, res) {
        WorshipTemplate.deleteMany({}, function (err) {
            if (err)
                res.status(400).send(err.errmsg);
            else
                res.status(200).send('deleted');
        });
    }
}

export default new WorshipTemplateActions();
