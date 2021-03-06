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
  },

  updateEmail: (req, res, next) => {

    let id = req.params.id;
    let email = req.body.email;

    User.findOneAndUpdate({'_id': id}, {
      $set:{email:email}
    }, function(err, doc){
          if(err){
              console.log("Something wrong when updating data!");
          }

          res.json('update successful');
    })
  },

  logout: (req, res, next) => {
    req.logout();
    res.redirect('/');
    //res.json('logout')
  },

  deleteUser: (req, res, next) => {
    User.remove({_id: req.params.id}, (err) => {
      if (err) return res.json({message: 'could not delete user because: ' + err})
      req.logout()
      res.send('deleted');
    });
  },

  getUserDetails: (req, res) => {
    console.log(req.user);
  }




}
module.exports = userController
