import client_model from "../model/cliend_model.js";

class user_verify{
    static login_verify=async (req,res)=>{
        try{
            const {email,password}=req.body;
            const result= await client_model.findOne({email:email});
            if(result!=null){
                if(result.email==email && result.password==password){
                    res.send(`hey ${result.name} welcome to spirit family
                    this is your dashboard.`);
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
}


export default user_verify;