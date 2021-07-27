import express from 'express';
import WorshipOnDutyActions from '../actions/worship-on-duty-actions';

const router = express.Router();

router.get('/', function(req, res) { WorshipOnDutyActions.getAll(req, res) });
router.get('/:id', function(req, res) { WorshipOnDutyActions.getOne(req, res) });

router.post('/add', function(req, res) { WorshipOnDutyActions.addOne(req, res) });
router.post('/update/:id', function(req, res) { WorshipOnDutyActions.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { WorshipOnDutyActions.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { WorshipOnDutyActions.deleteAll(req, res) });

export default router;
