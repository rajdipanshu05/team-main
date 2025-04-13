import express from 'express';
import { register, login, logout } from '../controllers/user.controller.js';
import  isAuthenticated  from '../middlewares/isAuthenticated.js';
const router= express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated,logout);

export default router;