import client_model from "../model/cliend_model.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';




class home_event {
    static My_home = (req, res) => {
        res.render('home', { 'title': 'Home' });
    }
    static My_gallery = (req, res) => {
        res.render('gallery', { 'title': 'Gallery' })
    }

    static My_login = (req, res) => {
        res.render('login', { 'title': 'login here' })
    }
    static My_registration = (req, res) => {
        res.render('registration', { 'title': 'welcome!' })
    }

    static speakers = (req, res) => {
        res.render('speakers', { 'title': 'spirit 2023: speakers!' });
    }
    static about = (req, res) => {
        res.render('about', { 'title': 'spirit 2023: know more about us' })
    }
    static sponsors = (req, res) => {
        res.render('sponsors', { 'title': 'our sponsors' });
    }

    static forgetPassword = (req, res) => {
        res.render('forget-password')
    }

    static forgetPassword_verify = async (req, res) => {
        try {
            const { email } = req.body;
            // make sure user exist with this email
            const result = await client_model.findOne({ email: email });
            if (!result) {
                res.send('user not registered');
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
            const testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });
            const mailOption = {
                from: 'sp48840@gmail.com', // sender address
                to: 'suraj.patel.phe20@itbhu.ac.in', // list of receivers
                subject: "Hello ✔", // Subject line
                text: `hey ${result.name} this is Team spirit please click the link below to reset your
                password!! Thank you!!`, // plain text body
                html:`${link}`, // html body
            };

            transporter.sendMail(mailOption,function(error,info){
                if(error){
                    console.log(error.message);
                    
                }
                else{
                    console.log('mail send successfully!!!');
                    
                }
            });

            res.send('password reset link has been sent to your email')

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

            res.render('reset-password', { email: result.email });
        } catch (error) {
            console.log(error);

        }
    }

    static savePassword = async (req, res) => {
        const { id, token } = req.params;
        const { password, password2 } = req.body;

        const result = await client_model.findOne({ _id: id });
        if (!result) {
            res.send('invalid id....')
            return;
        }

        const secret = process.env.JWT_SECREAT_KEY + result.password;
        try {

            const paylode = Jwt.verify(token, secret);
            console.log('paylod verifyed');

            if (password !== password2) {
                res.send('password not matched')
                return

            }
            const hashPassword = await bcrypt.hash(password, 10);
            // console.log(result.password);

            const data = await client_model.findByIdAndUpdate(id, { password: hashPassword });
            res.send('password reset successfully')
            // console.log(data.password);




        } catch (error) {
            console.log(error);

        }
    }
}


export default home_event;