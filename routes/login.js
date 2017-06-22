import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();
// Login
router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

module.exports = router
