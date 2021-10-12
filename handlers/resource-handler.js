import express from 'express';
import ResourceActions from './../actions/resource-actions';

const router = express.Router();

router.get('/', function(req, res) { ResourceActions.getAll(req, res) });
router.get('/:id', function(req, res) { ResourceActions.getOne(req, res) });

router.post('/add', function(req, res) { ResourceActions.addOne(req, res) });
router.post('/update/:id', function(req, res) { ResourceActions.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { ResourceActions.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { ResourceActions.deleteAll(req, res) });

export default router;
