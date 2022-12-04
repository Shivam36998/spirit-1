import home_event from "../controller/home_controller.js";
import user_verify from "../controller/userLogin_controller.js";
import express from 'express';

const router=express.Router();

router.get('/', home_event.My_login);
router.post('/',user_verify.login_verify);

export default router;