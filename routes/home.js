import express from 'express';
import My_home from '../controller/home_controller.js';
const router=express.Router();

router.get('/',My_home);
router.get('/home',My_home);


export default router;