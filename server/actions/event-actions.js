import eventSchema from '../schemas/event-schema';

class EventActions {
    addOne(req, res) {
        var event = new eventSchema(req.body);
        event.save(function (err, event) {
            if (err)
                res.status(400).send(err.message);
            else
                res.status(200).send(event);
        });
    }

    getAll(req, res) {
        eventSchema.find(function (err, events) {
            if (err)
                res.status(400).send(err.message);
            else
                res.status(200).send(events);
        });
    }

    getOne(req, res) {
        eventSchema.find({
            _id: req.params.id
        }, function (err, event) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (event == '')
                res.status(404).send("event '" + req.params.id + "' not found");
            else
                res.status(200).send(event);
        });
    }

    updateOne(req, res) { // for all other fields that's not an array
        eventSchema.updateOne({ _id: req.params.id }, req.body, function (err, event) {
            if (err)
                res.status(400).send(err.errmsg);
            else if (event.n == 0)
                res.status(404).send("event '" + req.params.id + "' not found");
            else
                res.status(200).send(event);
        });
    }

    deleteOne(req, res) {
        eventSchema.deleteOne({ _id: req.params.id }, function (err, event) {
            if (err)
                res.status(400).send(err.errmsg)
            else if (event.n == 0)
                res.status(404).send("event '" + req.params.id + "' not found");
            else
                res.status(200).send('deleted');
        });
    }

    deleteAll(req, res) {
        eventSchema.deleteMany({}, function (err) {
            if (err)
                res.status(400).send(err.errmsg);
            else
                res.status(200).send('deleted');
        });
    }
}

export default new EventActions();
