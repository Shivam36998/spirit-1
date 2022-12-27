import client_model from "../model/cliend_model.js";
import subscriber_model from "../model/subscriber_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class data_collector {
    static creat_client = async (req, res) => {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        try {
            const { name, gender, college, year, city, email, phone } = req.body;
            const client = await client_model.findOne({ email: email });
            if (client) {
                res.render('greet', { 'title': 'spirit', message: 'Email already exist!!' });
            }
            else {
                const client_doc = new client_model({
                    name: name,
                    gender: gender,
                    college: college,
                    year: year,
                    city: city,
                    email: email,
                    phone: phone,
                    password: hashPassword,

                })
                const result = await client_doc.save();
                // console.log(typeof(result.gender));


                const saved_Client = await client_model.findOne({ email: email });
                // generate JWT token
                // const token = jwt.sign({ userID: saved_Client._id }, process.env.JWT_SECREAT_KEY, { expiresIn: '5d' });
                // console.log(token);



            }
            res.redirect('/login');
            // console.log(result);

        } catch (error) {
            console.log(error);

        }
    }

    // static fatch_client = async (req, res) => {
    //     try {
    //         const result = await client_model.find();
    //         res.render('admin', { 'title': 'Admin Pannel', data: result });
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    static client_login = async (req, res) => {
        try {
            let token;
            const { email, password } = req.body;
            const result = await client_model.findOne({ email: email });
            if (result != null) {
                const isClient = await bcrypt.compare(password, result.password)
                token = await result.generateAuthToken();
                res.cookie("spirit", token, {
                    expiresIn: "5d",
                    httpOnly: true
                })
                if (result.email == email && isClient) {
                    // generate token
                    // const token = jwt.sign({ userID: result._id }, process.env.JWT_SECREAT_KEY, { expiresIn: '5d' });
                    // console.log(token);


                    // res.send(`hey ${result.name} welcome to spirit family
                    // this is your dashboard.`);

                    res.render('registration/login', { 'title':`welcome😍 ${result.name}`, messages:`Welcome to Spirit ${result.name} you are login successfully!` });
                }
                else {
                    res.render('login', { 'title': `Login failed ☹️`, messages: `Wrong EmailId or Password` });

                }
            }
            else {
                res.render('login', { 'title': `Oops! You are not registered!`, messages: `You are not a registered user!` });

            }
        } catch (err) {
            console.log(err);

        }
    }

    static client_logout = async (req, res) => {
        try {
            req.client.tokens = req.client.tokens.filter((token) => {
                return token.token != req.token
            })

            res.clearCookie("spirit");
            console.log('log out successfully');
            res.redirect('/login');



            await req.client.save();
        }
        catch (err) {
            console.log(err);

        }

    }

    // static creat_subscriber= async (req,res)=>{
    //     try{
    //         const email=req.body;
    //         const subs_doc=new subscriber_model({
    //            email:email
    //         })
    //         const result= await subs_doc.save();
    //         console.log(result);


    //     }catch(err){
    //         console.log(err);

    //     }
    // }

    static fatch_subscriber = async (req, res) => {
        try {
            const result = await subscriber_model.find()
        } catch (error) {
            console.log(error);

        }
    }


    // reset email
    // static sendClientPasswordResetEmail= async(req,res)=>{
    //     try{
    //         const {email}=req.body;
    //         if(email){
    //             const client=await client_model.findOne({email:email})
    //             const secret=client._id + process.env.JWT_SECREAT_KEY;
    //             if(client){
    //                 const token = jwt.sign({ userID: client._id }, secret, { expiresIn: '15m' });
    //                 // console.log(token);
    //             }else{
    //                 res.send("email does not exist")
    //             }
    //         }else{
    //             res.send("email required")
    //         }
    //     }catch(error){
    //         console.log(error);

    //     }
    // }
}

export default data_collector;