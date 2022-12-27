import dotenv from 'dotenv';
dotenv.config();
import client_model from "../model/cliend_model.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay'

const instance = new Razorpay({
    key_id:process.env.key_id,
    key_secret: process.env.key_secret//'y0BfQBSZH0rnVuNZ7RU0Z5oB'
});




// async..await is not allowed in global scope, must use a wrapper



class home_event {
    static My_home = (req, res) => {
        res.render('pages/home', { 'title': 'Home' });
    }
    static My_gallery = (req, res) => {
        res.render('pages/gallery', { 'title': 'Gallery' })
    }

    static My_login = (req, res) => {
        res.render('registration/login', { 'title': 'login here' })
    }
    static My_registration = (req, res) => {
        res.render('registration/registration', { 'title': 'welcome!' })
    }

    static speakers = (req, res) => {
        res.render('pages/speakers', { 'title': 'spirit 2023: speakers!' });
    }
    static about = (req, res) => {
        res.render('pages/about', { 'title': 'spirit 2023: know more about us' })
    }
    static sponsors = (req, res) => {
        res.render('pages/sponsors', { 'title': 'our sponsors' });
    }

    static forgetPassword = (req, res) => {
        res.render('registration/forget-password')
    }
    static My_payment_dashboard=(req,res)=>{
        res.render('payments/payment_dashboard',{'title':'welcome!'})
    }

    static forgetPassword_verify = async (req, res) => {
        try {
            const { email } = req.body;
            // make sure user exist with this email
            const result = await client_model.findOne({ email: email });
            if (!result) {
                //res.send('user not registered');
                res.render('registration/forget-password', { messages: 'User not registered' })

                return;
            }
            // res.send(email);
            const secret = process.env.JWT_SECREAT_KEY + result.password;
            const payload = {
                email: result.email,
                id: result._id
            }
            const token = Jwt.sign(payload, secret, { expiresIn: '15m' });
            // link
            const link = `http://localhost:5000/reset-password/${result._id}/${token}`
            console.log(link);
            // const testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user:process.env.userMail,// generated ethereal user
                    pass: process.env.userPassword// generated ethereal password//hpepzgtpgvscgfql

                },
            });
            const mailOption = {
                from:'sp48840@gmail.com', // sender address
                to: result.email,//result.email, // list of receivers
                subject: "Password reset", // Subject line
                text: `hey ${result.name} this is Team spirit please click the link below to reset your
                password!! Thank you!!`, // plain text body
                html: `
                <h3> Hey <strong style="color:white; background:blue;"> ${result.name} </strong>, this is Team Spirit.</h3>
                <br>
                <h5>We recived a request to reset your password for account.</h5><br>
                <p style="color:blue;"> Click the link below 👇👇 to reset your password!</p><br>
                ${link}
                
                `, // html body
            };

            transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                    console.log(error);

                }//mrwddeyjdyqywkbh
                else {
                    console.log('Mail send successfully!!');

                }
            });


            //res.send('password reset link has been sent to your email')
            res.render('registration/forget-password', { messages: 'Password reset link has been sent to your Email' })


        } catch (error) {
            console.log(error);

        }
    }

    static resetPassword = async (req, res) => {

        const { id, token } = req.params;
        // res.send(req.params);
        // check if this id is real

        const result = await client_model.findOne({ _id: id })
        // res.send(result)

        if (!result) {
            res.send('not a valid user')
            return;
        }
        //  id is valid
        const secret = process.env.JWT_SECREAT_KEY + result.password;

        try {
            const paylod = Jwt.verify(token, secret)
            // console.log(paylod);

            // console.log('baba');

            res.render('registration/reset-password', { email: result.email });
        } catch (error) {
            console.log(error);

        }
    }

    static savePassword = async (req, res) => {
        const { id, token } = req.params;
        const { password, password2 } = req.body;

        const result = await client_model.findOne({ _id: id });
        if (!result) {
            res.render('registration/reset-password', { email:"",messages:"Invalid id.." });
            return;
        }

        const secret = process.env.JWT_SECREAT_KEY + result.password;
        try {

            const paylode = Jwt.verify(token, secret);
            console.log('paylod verifyed');

            if (password !== password2) {
                res.render('registration/reset-password', { email:result.email,messages:"Both passwords should be same!" });
                return

            }
            const hashPassword = await bcrypt.hash(password, 10);
            // console.log(result.password);

            const data = await client_model.findByIdAndUpdate(id, { password: hashPassword });
            res.render('registration/reset-password', { email:result.email,messages:"Password reset successful!" });
            // console.log(data.password);




        } catch (error) {
            console.log(error);

        }
    }


    // payment related code


    static creatOrer = (req, res) => {
        console.log('create order request', req.body);
        var options = {
            amount: req.body.amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {
            console.log(order);
            res.send({ orderId: order.id })
        });
    }

    static verifyOrder = (req, res) => {
        let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

        var crypto = require("crypto");
        var expectedSignature = crypto.createHmac('sha256', 'y0BfQBSZH0rnVuNZ7RU0Z5oB')
            .update(body.toString())
            .digest('hex');
        console.log("sig received ", req.body.response.razorpay_signature);
        console.log("sig generated ", expectedSignature);
        var response = { "signatureIsValid": "false" }
        if (expectedSignature === req.body.response.razorpay_signature)
            response = { "signatureIsValid": "true" }
        // console.log('verify');

        res.send(response);
    }

}


export default home_event;