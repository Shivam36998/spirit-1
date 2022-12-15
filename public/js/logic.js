import subscriber_model from "../../model/subscriber_model.js";
const email=document.getElementById('email_sub');
    const subscriber=document.getElementById('subscriber');

    subscriber.addEventListener('click',()=>{
        console.log(email.value);
        email.value=""
    })
    


// console.log(result_from);

