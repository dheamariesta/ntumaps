// This is a router file
// Router -> controller -> schema
import express from 'express';
import User from '../models/user';

const router = express.Router();

/* GET index page. */
router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login'
  });
});

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'NTU Maps'
  });
});

router.post('/login', (req, res, next) => {
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
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Signup'
  });
});

router.post('/signup', (req, res, next) => {
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
});

router.get('/secret', (req, res, next) => {
  res.render('secret', {
    title: 'Major secret'
  });
});

export default router;
