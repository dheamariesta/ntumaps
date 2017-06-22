import express from 'express';
import pathController from '../controllers/pathController';
import userController from '../controllers/userController';
const passport = require('passport');

const router = express.Router();
function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

router.get('/dashboard', isLoggedIn, function(req, res) {
  res.render('dashboard', {
    message: req.flash('loginMessage')
  })
})

router.post('/dashboard', pathController.getRoute);

router.put('/dashboard/:id', userController.updateEmail);

router.get('/logout', userController.logout)

router.get('/user', isLoggedIn, function(req, res) {
   res.json(req.user);
})

module.exports = router
