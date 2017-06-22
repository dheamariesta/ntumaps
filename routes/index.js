// This is a router file
// Router -> controller -> schema
import express from 'express';
import pathController from '../controllers/pathController';
import userController from '../controllers/userController';
//import adminController from '../controllers/adminController';
//import passport from '../config/passport';

const router = express.Router();

/* GET index page. */
router.post('/', pathController.getRoute)



//
//
// router.get('/dashboard', (req, res, next) => {
//   if(!req.user){
//     res.redirect('/login');
//   }
//   res.render('dashboard', {
//     title: 'Dashboard'
//   })
// })
// router.post('/dashboard', pathController.getSavedRoute);
//
// router.get('/admin', adminController.showLogin);
// router.post('/admin', adminController.login);
//
// router.get('/admin/signup', adminController.showSignUp);
// router.post('/admin/signup', adminController.signup);
//
// router.get('/adminmap', adminController.home);
// router.post('/adminmap', pathController.save);
//
// router.get('/secret', (req, res, next) => {
//   res.render('secret', {
//     title: 'Major secret'
//   });
// });



// module.exports = function(passport) {
//   function isLoggedIn (req, res, next) {
//     if(req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/dashboard')
//   }
//
//   //Sign up
//   app.get('/signup', function(req, res) {
//     res.render('signup', {
//       message: req.flash('loginMessage')
//     })
//   })
//
//   app.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/',
//     failureRedirect : '/signup',
//     failureFlash: true
//   }))
//
//
//
//   //dashboard
//   app.get('/dashboard', isLoggedIn, function(req, res) {
//     res.render('dashboard', {
//       message: req.flash('loginMessage')
//     })
//   })
//
// }

export default router;
