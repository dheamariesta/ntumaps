// This is a router file
// Router -> controller -> schema
import express from 'express';
import pathController from '../controllers/pathController';
import userController from '../controllers/userController';
import adminController from '../controllers/adminController';
import passportConfig from '../config/passport';

const router = express.Router();

/* GET index page. */

router.post('/adminmap', pathController.save);
router.get('/', userController.home);
router.post('/', pathController.getRoute);



router.get('/dashboard', (req, res, next) => {
  if(!req.user){
    res.redirect('/login');
  }
  res.render('dashboard', {
    title: 'Dashboard'
  })
})



router.post('/dashboard', pathController.getSavedRoute);
router.get('/login', userController.showLogin);

router.post('/login', userController.login);

router.get('/admin', adminController.showLogin);

router.post('/admin', adminController.login);

router.get('/admin/signup', adminController.showSignUp);

router.post('/admin/signup', adminController.signup);
router.get('/adminmap', adminController.home);

router.get('/signup', userController.showSignUp);

router.post('/signup', userController.signup);

router.get('/secret', (req, res, next) => {
  res.render('secret', {
    title: 'Major secret'
  });
});

export default router;
