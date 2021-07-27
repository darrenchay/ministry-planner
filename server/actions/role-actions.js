import roleSchema from '../schemas/role-schema';

class roleActions {
    addOne(req, res) {
		var role = new roleSchema(req.body);
		role.save(function(err, role) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(role);
		});
	}

	getAll(req, res) {
		roleSchema.find(function(err, role) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(role);
		});
	}

	getOne(req, res) {
		roleSchema.find({
			id : req.params.id
		}, function(err, role) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (role == '')
				res.status(404).send("role '" + req.params.id + "' not found");
			else
				res.status(200).send(role);
		});
	}

	updateOne(req, res) { // for all other fields that's not an array
		roleSchema.updateOne({id : req.params.id}, req.body, function(err, role) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (role.n == 0)
				res.status(404).send("role '" + req.params.id + "' not found");
			else
				res.status(200).send(role);
		});
	}

	deleteOne(req, res) {
		roleSchema.deleteOne({id: req.params.id}, function(err, role) {
			if (err)
				res.status(400).send(err.errmsg)
			else if (role.n == 0)
				res.status(404).send("role '" + req.params.id + "' not found");
			else
				res.status(200).send('deleted');
		});
	}

	deleteAll(req, res) {
		roleSchema.deleteMany({}, function(err) {
			if (err)
				res.status(400).send(err.errmsg);
			else
				res.status(200).send('deleted');
		});
	}
}

export default new roleActions();
