import client_model from "../model/cliend_model.js";
import subscriber_model from "../model/subscriber_model.js";
class data_collector{
    static creat_client=async(req,res)=>{
        try{
            const {name,email,phone,password}= req.body;
            const client_doc= new client_model({
                name:name,
                email:email,
                phone:phone,
                password:password
            })
            const result=await client_doc.save();
            
            res.redirect('/login');
            // console.log(result);
            
        }catch(error){
            console.log(error);
            
        }
    }

    static creat_subscriber= async (req,res)=>{
        try{
            const email=req.body;
            const subs_doc=new subscriber_model({
               email:email
            })
            const result= await subs_doc.save();

        }catch(err){
            console.log(err);
            
        }
    }
}

export default data_collector;