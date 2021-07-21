import express from 'express';
import UserDB from './../db/user-db';

const router = express.Router();

router.get('/', function(req, res) { UserDB.getAll(req, res) });
router.get('/:id', function(req, res) { UserDB.getOne(req, res) });
router.get('/:email/:password', function(req, res) { UserDB.getOneByEmail(req, res) });

router.post('/add', function(req, res) { UserDB.addOne(req, res) });
router.post('/update/:id', function(req, res) { UserDB.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { UserDB.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { UserDB.deleteAll(req, res) });

export default router;
