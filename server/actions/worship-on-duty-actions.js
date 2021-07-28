import worshipOnDutySchema from '../schemas/worship-on-duty-schema';

class WorshipOnDutyActions {
    addOne(req, res) {
		var worshipOnDuty = new worshipOnDutySchema(req.body);
		worshipOnDuty.save(function(err, worshipOnDuty) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(worshipOnDuty);
		});
	}

	getAll(req, res) {
		worshipOnDutySchema.find(function(err, worshipOnDutys) {
			if (err)
				res.status(400).send(err.message);
			else
				res.status(200).send(worshipOnDutys);
		});
	}

	getOne(req, res) {
		worshipOnDutySchema.find({
			id : req.params.id
		}, function(err, worshipOnDuty) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (worshipOnDuty == '')
				res.status(404).send("worshipOnDuty '" + req.params.id + "' not found");
			else
				res.status(200).send(worshipOnDuty);
		});
	}

	updateOne(req, res) { // for all other fields that's not an array
		worshipOnDutySchema.updateOne({id : req.params.id}, req.body, function(err, worshipOnDuty) {
			if (err)
				res.status(400).send(err.errmsg);
			else if (worshipOnDuty.n == 0)
				res.status(404).send("worshipOnDuty '" + req.params.id + "' not found");
			else
				res.status(200).send(worshipOnDuty);
		});
	}

	deleteOne(req, res) {
		worshipOnDutySchema.deleteOne({id: req.params.id}, function(err, worshipOnDuty) {
			if (err)
				res.status(400).send(err.errmsg)
			else if (worshipOnDuty.n == 0)
				res.status(404).send("worshipOnDuty '" + req.params.id + "' not found");
			else
				res.status(200).send('deleted');
		});
	}

	deleteAll(req, res) {
		worshipOnDutySchema.deleteMany({}, function(err) {
			if (err)
				res.status(400).send(err.errmsg);
			else
				res.status(200).send('deleted');
		});
	}
}

export default new WorshipOnDutyActions();
