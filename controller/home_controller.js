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

    static speakers=(req,res)=>{
        res.render('speakers',{'title':'spirit 2023: speakers!'});
    }
    static about=(req,res)=>{
        res.render('about',{'title':'spirit 2023: know more about us'})
    }
    static sponsors=(req,res)=>{
        res.render('sponsors',{'title':'our sponsors'});
    }
}


export default home_event;