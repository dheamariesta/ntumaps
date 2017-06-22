let User = require ('../models/user');
const passport = require('passport');

let userController = {
  getLogin: (req, res, next) => {
    res.render('login', {
      title: 'Login'
    })
  },

  postLogin: (req, res, next) => {
    var userLoginStrategy = passport.authenticate('local-login', {
      successRedirect : '/dashboard',
      failureRedirect : '/login',
      failureFlash: false
    })
    console.log('entered')
    console.log(userLoginStrategy);
    return userLoginStrategy(req, res, next)
  },

  getSignup: (req, res, next) => {
    res.render('signup', {
      title: 'Sign up'
    })
  },

  postSignup: (req, res, next) => {
    var userSignupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash: false
    })
    return userSignupStrategy(req, res, next)
  }



}
module.exports = userController
