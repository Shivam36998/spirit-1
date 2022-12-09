import data_collector from '../controller/client_controller.js';
import express from 'express';
import admin  from '../controller/admin_controller.js';
import config from '../config/config.js';
import session from 'express-session';
const router= express.Router();

// router.use(session({secret:config.sessionSecreat}));
// import client_model from '../model/cliend_model.js';


// router.get('/',data_collector.fatch_client);
router.get('/',admin.adm_login);
router.post('/',admin.admin_verify);
router.get('/admin_home',data_collector.fatch_client );
router.get('/logout', admin.admin_logout);


// temporery router
// router.get('/123', data_collector.fatch_client);
router.get('*',(req,res)=>{
    res.redirect('/admin');
});

export default router;