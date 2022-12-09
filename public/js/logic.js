import subscriber_model from "../../model/subscriber_model.js";
const sub_btn=document.getElementById("subscriber");
const result_from =document.getElementById("email_sub").value;

const creat_subscriber= async ()=>{
    try{
        const email=result_from;
        const subs_doc=new subscriber_model({
           email:email
        })
        const result= await subs_doc.save();
        result_from.value="oioi";
        console.log(result);
        

    }catch(err){
        console.log(err);
        
    }
}

sub_btn.onclick=creat_subscriber();
// console.log(result_from);

