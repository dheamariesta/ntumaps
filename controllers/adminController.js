let Admin = require ('../models/admin');

let adminController = {
  home: (req, res, next) => {
    res.render('adminmap', {
      title: 'Admin'
    });
  },

  showLogin: (req, res, next) => {
    res.render('admin', {
      title: 'Admin login'
    });
  },

  login: (req, res, next) => {
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    console.log(password);

    Admin.find({ username : username }, (err, admins) => {
      if (err) {
        console.log(err);
        res.render('admin', {
          title: 'Admin login'
        });
      } else {
        admins[0].comparePassword(password, (err, isMatch) => {
          if (isMatch) {
            res.redirect('/');
          } else {
            res.render('admin', {
              title: 'Admin login'
            });
          }
        });
      }
    });
  },

  showSignUp: (req, res, next) => {
    res.render('adminsignup', {
      title: 'Signup'
    });
  },

  signup: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = new Admin({
      username : username,
      password : password
    });
    console.log(admin);
    admin.save ((err, admin) => {
      console.log('Admin is saved');

      if (err) {
        console.log(err);
        res.render('adminsignup', {
          title: 'Admin Sign up'
        });
      }

      res.redirect('/adminmap');
    });
  }
}
module.exports = adminController
