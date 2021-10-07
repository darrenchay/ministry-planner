import userSchema from '../schemas/user-schema';

class UserActions {
    addOne(req, res) {
        var user = new userSchema(req.body);
        user.save(function (err, user) {
            if (err)
                res.status(400).send(err.message);
            else
                res.status(200).send(user);
        });
    }

    getAll(req, res) {
        userSchema.find()
            .populate('assignedEvents', 'eventId')
            .exec((err, user) => {
                if (err)
                    res.status(400).send(err.errmsg);
                else if (user == '')
                    res.status(404).send("User '" + req.params.id + "' not found");
                else
                    res.status(200).send(user);
            });
    }

    getOne(req, res) {
        userSchema.findOne({ _id: req.params.id })
            .populate('assignedEvents', 'eventId')
            .exec((err, user) => {
                if (err)
                    res.status(400).send(err.errmsg);
                else if (user == '')
                    res.status(404).send("User '" + req.params.id + "' not found");
                else
                    res.status(200).send(user);
            });
    }

    getAllByRole(req, res) {
        userSchema.find({
            ministry: req.params.ministry,
            role: req.params.role
        }, function (err, users) {
            if (err) {
                res.status(400).send(err);
            } else if (users == '') {
                res.status(404).send("No users with role '" + req.body.role + "' not found");
            } else {
                res.status(200).send(users);
            }
        })
    }

    getOneByEmail(req, res) {
        userSchema.find({
            email: req.params.email,
            password: req.params.password
        }, function (err, user) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (user == '')
                res.status(404).send("User '" + req.params.email + "' not found");
            else
                res.status(200).send(user);
        });
    }

    updateOne(req, res) { // for all other fields that's not an array
        userSchema.updateOne({ _id: req.params.id }, req.body, function (err, user) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (user.n == 0)
                res.status(404).send("User '" + req.params.id + "' not found");
            else
                res.status(200).send(user);
        });
    }

    deleteOne(req, res) {
        userSchema.deleteOne({ _id: req.params.id }, function (err, user) {
            if (err)
                res.status(400).send(err.errmsg)
            else if (user.n == 0)
                res.status(404).send("User '" + req.params.id + "' not found");
            else
                res.status(200).send('deleted');
        });
    }

    deleteAll(req, res) {
        userSchema.deleteMany({}, function (err) {
            if (err)
                res.status(400).send(err.errmsg);
            else
                res.status(200).send('deleted');
        });
    }
}

export default new UserActions();
