import express from 'express';
import UserActions from './../actions/user-actions';

const router = express.Router();

router.get('/', function(req, res) { UserActions.getAll(req, res) });
router.get('/:id', function(req, res) { UserActions.getOne(req, res) });
// router.get('/:email/:password', function(req, res) { UserActions.getOneByEmail(req, res) });
router.get('/auth/:authId', function(req, res) { UserActions.getOneByAuthId(req, res) });
router.get('/getRoles/:ministry/:role', function(req, res) { UserActions.getAllByRole(req, res) });

router.post('/add', function(req, res) { UserActions.addOne(req, res) });
router.post('/update/:id', function(req, res) { UserActions.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { UserActions.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { UserActions.deleteAll(req, res) });

export default router;
