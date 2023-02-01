import ca_model from "../model/ca_details.js";


class creatCA{
    static CA_page=(req,res)=>{
        res.render('pages/campusA');
    }
    static CA_Details=async(req,res)=>{
        try{
            const {name,lname,email,phone,gender,college,year,whatsapp,address,code,question}=req.params;
            const CA= await ca_model.findOne({email:email});
            if (CA) {
                var messages="Email already exist!!";
                res.render('error/greet', { 'title': 'error', messages, state:false});
                console.log(messages);
                
            }
            else{
                const ca_Doc=new ca_model({
                    name:name,
                    lname:lname,
                    email:email,
                    phone:phone,
                    gender:gender,
                    college:college,
                    year:year,
                    whatsapp:whatsapp,
                    address:address,
                    code:code,
                    question:question
                })

                const result= await ca_Doc.save();
                console.log(result);
                
            }
        }catch(err){
            console.log(err.message);
            
        }
    }
}

export default creatCA;