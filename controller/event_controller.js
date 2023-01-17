
import client_model from "../model/cliend_model.js";
import jwt from 'jsonwebtoken'


class event_handler {
    static my_event = (req, res) => {
        res.render('events/event', { 'title': 'Upcoming events!',messages:'' });
        // console.log(req.cookies.spirit);

    }

    static event_2 = async (req, res) => {
        const token = req.cookies.spirit;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        if (!verifyUser) {
            res.send("error 404")
        }
        else {
            const clint_detail = await client_model.findOne({ _id: verifyUser._id })
            console.log(token);

            res.render('events/evenst_registration', { data: clint_detail });
        }

    }
}

export default event_handler;