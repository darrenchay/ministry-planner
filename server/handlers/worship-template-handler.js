import express from 'express';
import WorshipTemplate from '../actions/worship-template-actions';

const router = express.Router();

router.get('/', function(req, res) { WorshipTemplate.getAll(req, res) });
router.get('/:id', function(req, res) { WorshipTemplate.getOne(req, res) });

router.post('/add', function(req, res) { WorshipTemplate.addOne(req, res) });
router.post('/update/:id', function(req, res) { WorshipTemplate.updateOne(req, res) });
router.post('/updateRole/:id', function(req, res) { WorshipTemplate.updateRole(req, res) });

router.delete('/delete/:id', function(req, res) { WorshipTemplate.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { WorshipTemplate.deleteAll(req, res) });

export default router;
