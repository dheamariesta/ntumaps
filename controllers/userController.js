let User = require ('../models/user');

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
            res.redirect('/secret');
          } else {
            res.render('login', {
              title: 'Login'
            });
          }
        });
      }
    });
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
