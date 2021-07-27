import resourceSchema from '../schemas/resource-schema';

class ResourceActions {
    addOne(req, res) {
		var resource = new resourceSchema(req.body);
		resource.save(function(err, resource) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(resource);
		});
	}

	getAll(req, res) {
		resourceSchema.find(function(err, resources) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(resources);
		});
	}

	getOne(req, res) {
		resourceSchema.find({
			id : req.params.id
		}, function(err, resource) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (resource == '')
				res.status(404).send("resource '" + req.params.id + "' not found");
			else
				res.status(200).send(resource);
		});
	}

	updateOne(req, res) { // for all other fields that's not an array
		resourceSchema.updateOne({id : req.params.id}, req.body, function(err, resource) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (resource.n == 0)
				res.status(404).send("resource '" + req.params.id + "' not found");
			else
				res.status(200).send(resource);
		});
	}

	deleteOne(req, res) {
		resourceSchema.deleteOne({id: req.params.id}, function(err, resource) {
			if (err)
				res.status(400).send(err.errmsg)
			else if (resource.n == 0)
				res.status(404).send("resource '" + req.params.id + "' not found");
			else
				res.status(200).send('deleted');
		});
	}

	deleteAll(req, res) {
		resourceSchema.deleteMany({}, function(err) {
			if (err)
				res.status(400).send(err.errmsg);
			else
				res.status(200).send('deleted');
		});
	}
}

export default new ResourceActions();
