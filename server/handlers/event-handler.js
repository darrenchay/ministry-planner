import express from 'express';
import EventDB from './../db/event-db';

const router = express.Router();

router.get('/', function(req, res) { EventDB.getAll(req, res) });
router.get('/:id', function(req, res) { EventDB.getOne(req, res) });

router.post('/add', function(req, res) { EventDB.addOne(req, res) });
router.post('/update/:id', function(req, res) { EventDB.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { EventDB.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { EventDB.deleteAll(req, res) });

export default router;
