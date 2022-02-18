import express from 'express';
import WorshipEventDetails from '../actions/worship-event-details-actions';

const router = express.Router();

router.get('/', function(req, res) { WorshipEventDetails.getAll(req, res) });
router.get('/:id', function(req, res) { WorshipEventDetails.getOne(req, res) });

router.post('/add', function(req, res) { WorshipEventDetails.addOne(req, res) });
router.post('/update/:id', function(req, res) { WorshipEventDetails.updateOne(req, res) });
router.post('/updateRole/:id', function(req, res) { WorshipEventDetails.updateRole(req, res) });
router.get('/updateStatus/:eventDetailsId/:id/:status', function(req, res) { WorshipEventDetails.updateUserStatus(req, res) });

router.delete('/delete/:id', function(req, res) { WorshipEventDetails.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { WorshipEventDetails.deleteAll(req, res) });

export default router;
