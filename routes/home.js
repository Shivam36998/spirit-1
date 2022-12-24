import express from 'express';
import home_event from '../controller/home_controller.js';
import data_collector from '../controller/client_controller.js';
import authUser from '../middleware/authUser.js';
const router=express.Router();

router.get('/',home_event.My_home);
router.get('/home',home_event.My_home);
router.get('/gallery',home_event.My_gallery);
router.get('/speakers',home_event.speakers);
router.get('/sponsors',home_event.sponsors);
router.get('/about',home_event.about);
router.get('/developer team',home_event.My_gallery);
// router.get('/events',home_event.My_gallery);
router.get('/login',home_event.My_login);
router.post('/login',data_collector.client_login);

router.get('/logout',authUser, data_collector.client_logout);
router.get('/registration',home_event.My_registration);
router.post('/registration',data_collector.creat_client);
// router.get('/login',home_event.My_login);
// router.get('/registration',home_event.My_registration);

// forgot password
router.get('/forgetpassword',home_event.forgetPassword);
router.post('/forgetpassword',home_event.forgetPassword_verify);

// reset password
router.get('/reset-password/:id/:token',home_event.resetPassword);
router.post('/reset-password/:id/:token',home_event.savePassword);

//payment dashboard
router.get('/payment_dashboard',home_event.My_payment_dashboard);

// payment getway integration
// router.get('/payments',(req,res)=>{
//     res.render('razorpay');
// })

// router.post('create/orderId',home_event.creatOrer)
// router.post('api/payment/verify',home_event.verifyOrder)


export default router;