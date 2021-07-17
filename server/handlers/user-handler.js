import express from 'express';
import UserDB from './../db/user-db';

const router = express.Router();

router.get('/', function(req, res) { UserDB.getAll(req, res) });
router.get('/:username', function(req, res) { UserDB.getOneByEmail(req, res) });
router.get('/:username/:password', function(req, res) { UserDB.getOne(req, res) });

router.post('/add', function(req, res) { UserDB.addUser(req, res) });
router.post('/update/:username', function(req, res) { UserDB.updatOne(req, res) });

router.delete('/delete/:username', function(req, res) { UserDB.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { UserDB.deleteAll(req, res) });

export default router;
