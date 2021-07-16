import userSchema from '../schemas/user-schema';

class UserDB {
    addOne(req, res) {
		var user = new userSchema(req.body);
		user.save(function(err, user) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(user);
		});
	}

	getAll(req, res) {
		userSchema.find(function(err, users) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(users);
		})
	}

	getOne(req, res) {
		userSchema.find({
			username : req.params.username,
			password : req.params.password
		}, function(err, user) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (user == '')
				res.status(404).send("User '" + req.params.username + "' not found");
			else
				res.status(200).send(user);
		});
	}

	getOneByEmail(req, res) {
		userSchema.find({
			username : req.params.email
		}, function(err, user) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (user == '')
				res.status(404).send("User '" + req.params.username + "' not found");
			else
				res.status(200).send(user);
		});
	}

	updateOne(req, res) { // for all other fields that's not an array
		userSchema.updateOne({username : req.params.username}, req.body, function(err, user) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (user.n == 0)
				res.status(404).send("User '" + req.params.username + "' not found");
			else
				res.status(200).send(user);
		});
	}

	deleteOne(req, res) {
		userSchema.deleteOne({username: req.params.username, password: req.body.password}, function(err, user) {
			if (err)
				res.status(400).send(err.errmsg)
			else if (user.n == 0)
				res.status(404).send("User '" + req.params.username + "' not found");
			else
				res.status(200).send('deleted');
		});
	}

	deleteAll(req, res) {
		userSchema.deleteMany({}, function(err) {
			if (err)
				res.status(400).send(err.errmsg);
			else
				res.status(200).send('deleted');
		});
	}
}

export default new UserDB();
