import express from 'express';
import pathController from '../controllers/pathController';
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


module.exports = router
