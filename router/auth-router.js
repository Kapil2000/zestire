import express from 'express';
const router = express.Router();
import authcontrollers from '../controllers/auth-controller.js';

// resource management form 
router.route('/').get(authcontrollers.home);
router.route('/create-resource').post(authcontrollers.createResource);

// forgot password
router.route('/email-send').post(authcontrollers.emailSend);
router.route('/verify-otp').post(authcontrollers.verifyOtp);
router.route('/change-password').post(authcontrollers.changePassword);

// schedule call
router.route('/meeting-details').post(authcontrollers.meetingDetails);

export default router;