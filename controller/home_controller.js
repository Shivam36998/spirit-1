class home_event{
    static My_home= (req,res)=>{
        res.render('home',{'title':'Home'});
    }
    static My_gallery=(req,res)=>{
        res.render('gallery',{'title':'Gallery'})
    }

    static My_login=(req,res)=>{
        res.render('login',{'title':'login here'})
    }
    static My_registration=(req,res)=>{
        res.render('registration',{'title':'welcome!'})
    }
    static My_payment_dashboard=(req,res)=>{
        res.render('payment_dashboard',{'title':'welcome!'})
    }
}


export default home_event;