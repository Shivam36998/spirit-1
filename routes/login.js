import  {render}  from "ejs";

import express from 'express';
const router=express.Router();
// 
router.get('/',(req,res)=>{
    res.render('login',{'title':'hello'});
});
export default router;