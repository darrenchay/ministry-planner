import express from 'express';
import EmailActions from './../actions/email-actions';

const router = express.Router();

router.post('/notifyUsers', function(req, res) { EmailActions.notifyUsers(req, res) });
router.post('/authNewUser', function(req, res) { EmailActions.authNewUser(req, res) });

export default router;
