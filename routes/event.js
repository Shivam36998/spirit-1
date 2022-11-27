import express from 'express';
import event_handler from '../controller/event_controller.js';
const router=express.Router();
// 
router.get('/',event_handler.my_event);
router.get('/page1', event_handler.event_2);
export default router;
// 