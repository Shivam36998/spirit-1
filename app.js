import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from 'cors';
// we use this module to connect the route path
import {join} from 'path';  
import home from './routes/home.js';
import Event from './routes/event.js';
import Connect_data from "./database/connect_db.js";
import Admin from './routes/admin.js';
import cookieParser from 'cookie-parser';
const app=express();

const port=process.env.PORT || 5000;

// data url
const Data_url=process.env.Data_url//'mongodb://localhost:27017/spirit_db';

// data base connection
 Connect_data(Data_url);
// here we are going to use express.static() function
// so that we can render the file of public folder

app.use(express.static(join(process.cwd(),'public')));
app.use(express.urlencoded({extended:false}));

// core policy
app.use(cors());

// we can use cookie-parser as a middleware
app.use(cookieParser());

app.set('views','./view')
app.set('view engine','ejs');

// routers for home page content
app.use('/',home);
// router for event page content
app.use('/events', Event);
// router for login page content
app.use('/registration',registration);
app.use('/login',login);

// this is admin routes☠️☠️☠️
app.use('/admin', Admin);
// app.use('/admin_home', adm_home);



app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
    
})