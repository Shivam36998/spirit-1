
class event_handler{
    static my_event=(req,res)=>{
        res.render('events/event',{'title':'Upcoming events!'});
        // console.log(req.cookies.spirit);
        
    }

    static event_2=(req,res)=>{
        res.render('pages/home',{'title':'ok'});
    }
}

export default event_handler;