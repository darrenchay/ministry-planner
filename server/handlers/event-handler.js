import express from 'express';
import EventActions from './../actions/event-actions';

const router = express.Router();

router.get('/', function(req, res) { EventActions.getAll(req, res) });
router.get('/:id', function(req, res) { EventActions.getOne(req, res) });

router.post('/add', function(req, res) { EventActions.addOne(req, res) });
router.post('/update/:id', function(req, res) { EventActions.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { EventActions.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { EventActions.deleteAll(req, res) });

export default router;
