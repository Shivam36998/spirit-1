import express from 'express';
import event_handler from '../controller/event_controller.js';
import authUser from '../middleware/authUser.js';
import authPayment from '../middleware/authPayment.js';
const router=express.Router();
// 
router.get('/',event_handler.my_event);
router.get('/register_event',authUser,authPayment,event_handler.event_2);
export default router;
// 