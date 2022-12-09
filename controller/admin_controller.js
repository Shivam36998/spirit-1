import admin_model from "../model/admin_model.js";
import data_collector from "./client_controller.js";
// import jwt from 'jsonwebtoken';





class admin{
static adm_login= async(req,res)=>{
    try{
        res.render('admin_login',{'title':'login admin'});
    }
    catch(error){
        console.log(error);
        
    }
}
static admin_verify=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const result= await admin_model.findOne({email:email});
        if(result!=null){
            // const token=result.generateAuthToken();
            if(result.email==email && result.password==password){
               res.redirect('/admin/admin_home');
            }
            else{
                res.send('worg emailid or password');
            }
        }
        else{
            res.send('you are not a registerd user')
        }
    }catch(err){
        console.log(err);
        
    }
        
   
}


static admin_logout= async(req,res)=>{

    try{
        req.session.destroy((err) => {
            res.redirect('/') // will always fire after session is destroyed
          })
    } catch(error){
        console.log(error);
        
    }
}



}

export default admin;