import express from 'express';
import EmailActions from './../actions/email-actions';

const router = express.Router();

router.post('/notifyUsers', function(req, res) { EmailActions.sendEmail(req, res) });

export default router;
