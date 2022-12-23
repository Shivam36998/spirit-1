import express from 'express';
import home_event from '../controller/home_controller.js';
const router=express.Router();

router.get('/',home_event.My_home);
router.get('/home',home_event.My_home);
router.get('/gallery',home_event.My_gallery);
router.get('/login',home_event.My_login);
router.get('/registration',home_event.My_registration);
router.get('/payment_dashboard',home_event.My_payment_dashboard);


export default router;