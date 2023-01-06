import jwt from "jsonwebtoken";
import client_model from "../model/cliend_model.js";

const authPayment = async (req, res, next) => {
    try {
        const token = req.cookies.spirit;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        if (!verifyUser) {
            res.send("please login before payment")
        } else {
            const client = await client_model.findOne({ _id: verifyUser._id });
            if(client.payment_status=="unpaid"){
                res.send("first go to payment")
            }
        }


        next();
    } catch (error) {
        res.redirect('/login');
        console.log(error);

    }
}

export default authPayment;