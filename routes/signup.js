import express from 'express';
import userController from '../controllers/userController';
const passport = require('passport');

const router = express.Router();
// Login
router.get('/signup', userController.getSignup);

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash: false
}));


module.exports = router
