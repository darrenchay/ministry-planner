import express from 'express';
import WorshipOnDutyDB from '../db/worship-on-duty-db';

const router = express.Router();

router.get('/', function(req, res) { WorshipOnDutyDB.getAll(req, res) });
router.get('/:id', function(req, res) { WorshipOnDutyDB.getOne(req, res) });

router.post('/add', function(req, res) { WorshipOnDutyDB.addOne(req, res) });
router.post('/update/:id', function(req, res) { WorshipOnDutyDB.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { WorshipOnDutyDB.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { WorshipOnDutyDB.deleteAll(req, res) });

export default router;
