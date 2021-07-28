import express from 'express';
import RoleActions from '../actions/role-actions';

const router = express.Router();

router.get('/', function(req, res) { RoleActions.getAll(req, res) });
router.get('/:id', function(req, res) { RoleActions.getOne(req, res) });

router.post('/add', function(req, res) { RoleActions.addOne(req, res) });
router.post('/update/:id', function(req, res) { RoleActions.updateOne(req, res) });

router.delete('/delete/:id', function(req, res) { RoleActions.deleteOne(req, res) });
router.delete('/deleteAll', function(req, res) { RoleActions.deleteAll(req, res) });

export default router;
