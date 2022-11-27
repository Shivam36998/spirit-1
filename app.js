import express from "express";
// we use this module to connect the route path
import {join} from 'path';  
import home from './routes/home.js';
import Event from './routes/event.js';
const app=express();

const port=process.env.PORT || 5000;

// here we are going to use express.static() function
// so that we can render the file of public folder

app.use(express.static(join(process.cwd(),'public')));
app.use(express.urlencoded({extended:false}));

app.set('views','./view')
app.set('view engine','ejs');

// routers for home page content
app.use('/',home);
// router for event page content
app.use('/events', Event);

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
    
})