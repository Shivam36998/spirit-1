import express from 'express';
import data_collector from '../controller/client_controller.js';
import home_event from '../controller/home_controller.js';


const router=express.Router();

router.get('/',home_event.My_registration);
router.post('/', data_collector.creat_client);





export default router;
