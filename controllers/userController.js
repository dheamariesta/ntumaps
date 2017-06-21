let User = require ('../models/user');
const passport = require('passport');

let userController = {
  home: (req, res, next) => {
    res.render('index', {
      title: 'NTU Maps'
    });
  },

  showLogin: (req, res, next) => {

    res.render('login', {
      title: 'Login'
    });
  },

  login: (req, res, next) => {
    /*
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    console.log(password);

    User.find({ username : username }, (err, users) => {
      if (err) {
        console.log(err);
        res.render('login', {
          title: 'Login'
        });
      } else {
        users[0].comparePassword(password, (err, isMatch) => {
          if (isMatch) {
            res.redirect('/dashboard');
          } else {
            res.render('login', {
              title: 'Login'
            });
          }
        });
      }
    });*/
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('password', 'Password cannot be blank').notEmpty();
    // req.sanitize('email').normalizeEmail({ remove_dots: false });

    // const errors = req.validationErrors();
    //
    // if (errors) {
    //   req.flash('errors', errors);
    //   return res.redirect('/login');
    // }

    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        //req.flash('errors', info);
        return res.redirect('/login');
      }
      req.login(user, (err) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/')
        }
        //req.flash('success', { msg: 'Success! You are logged in.' });

      });
    })(req, res, next);

  },

  showSignUp: (req, res, next) => {
    res.render('signup', {
      title: 'Signup'
    });
  },

  signup: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
      username : username,
      password : password
    });
    console.log(user);
    user.save ((err, user) => {
      console.log('User is saved');

      if (err) {
        console.log(err);
        res.render('signup', {
          title: 'Signup'
        });
      }

      res.redirect('/');
    });
  }





}
module.exports = userController
