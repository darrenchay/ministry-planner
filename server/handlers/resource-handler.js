import express from 'express';
import ResourceDB from '../db/resource-db';

const router = express.Router();

router.get('/', function(req, res) { ResourceDB.getAll(req, res) });
router.get('/:id', function(req, res) { ResourceDB.getOne(req, res) });

router.post('/add', function(req, res) { ResourceDB.addOne(req, res) });
router.post('/update/:id', function(req, res) { ResourceDB.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { ResourceDB.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { ResourceDB.deleteAll(req, res) });

export default router;
