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
                    res.status(404).send("User with id '" + req.params.id + "' not found");
                else
                    res.status(200).send(user);
            });
    }

    getAllByRole(req, res) {
        userSchema.find({
            ministry: req.params.ministry,
            role: req.params.role,
            registered: true,
            authenticated: true,
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
        }, function (err, user) {
            if (err)
                res.status(400).send(err.errmsg);
            else
                res.status(200).send({
                    user: user}
                );
        });
    }

    // getOneByAuthId(req, res) {
    //     userSchema.find({
    //         authId: req.params.authId
    //     }, function (err, user) {
    //         if (err)
    //             res.status(400).send(err.errmsg);
    //         else if (user == '')
    //             res.status(404).send("User  with auth id '" + req.params.email + "' not found");
    //         else
    //             res.status(200).send(user);
    //     });
    // }

    updateOne(req, res) { // for all other fields that's not an array
        userSchema.updateOne({ _id: req.params.id }, req.body, function (err, user) {
            if (err) {
                console.log(req.body);
                console.log(req.params.id)
                res.status(400).send(err.errmsg);
            }
            else if (user.n == 0)
                res.status(404).send("User '" + req.params.id + "' not found");
            else
                res.status(200).send(user);
        });
    }

    authenticateOne(req, res) {
        var body = {
            authenticated: false
        }
        if (req.params.authenticate == 'true') {
            body.authenticated = true;
        }
        userSchema.updateOne({ _id: req.params.id }, body, function (err, data) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (data.n == 0)
                res.status(404).send("User '" + req.params.id + "' not found");
            else if (data.nModified == 1 && body.authenticated == true) {
                res.status(200).send("User Authenticated");
                //send email to new user
            } else {
                res.status(200).send("Authenticated toggled");
            }
        });
    }

    registerOne(req, res) {
        var body = {
            registered: false
        }
        if (req.params.register == 'true') {
            body.registered = true;
        }
        // console.log(body)
        userSchema.updateOne({ _id: req.params.id }, body, function (err, user) {
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
