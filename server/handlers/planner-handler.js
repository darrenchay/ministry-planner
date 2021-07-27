import express from 'express';
import PlannerActions from './../actions/planner-page-actions';

const router = express.Router();

router.get('/getAll/:type', function(req, res) { PlannerActions.getAll(req, res) });

export default router;
