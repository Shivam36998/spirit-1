class event_handler{
    static my_event=(req,res)=>{
        res.send('this is event page');
    }

    static event_2=(req,res)=>{
        res.send('this is first event');
    }
}

export default event_handler;