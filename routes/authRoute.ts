import express from 'express';
const router = express.Router();
import authController from '../controllers/authConttroller'


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
export default router