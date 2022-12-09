import express from 'express';
import home_event from '../controller/home_controller.js';
import data_collector from '../controller/client_controller.js';
import authUser from '../middleware/authUser.js';
const router=express.Router();

router.get('/',home_event.My_home);
router.get('/home',home_event.My_home);
router.get('/gallery',home_event.My_gallery);
// router.get('/events',home_event.My_gallery);
router.get('/login',home_event.My_login);
router.post('/login',data_collector.client_login);

router.get('/logout',authUser, data_collector.client_logout);
router.get('/registration',home_event.My_registration);
router.post('/registration',data_collector.creat_client);
// router.get('/login',home_event.My_login);
// router.get('/registration',home_event.My_registration);


export default router;