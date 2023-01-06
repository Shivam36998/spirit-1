// Imports
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Razorpay from 'razorpay';
import Payment_model from '../model/payment_detail.js'
import { nanoid } from 'nanoid';
import crypto from 'crypto'
import payment_model from '../model/payment_detail.js';
import easyinvoice from 'easyinvoice';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import client_model from '../model/cliend_model.js';

const router = express.Router();

// Create an instance of Razorpay
let razorPayInstance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
})

/**
 * Make Donation Page
 * 
 */
router.get('/', function (req, res, next) {
    // Render form for accepting amount
    res.render('payments/order', {
        title: 'Donate for Animals'
    });
});

/**
 * Checkout Page
 * 
 */
router.post('/order', function (req, res, next) {
    const params = {
        amount: 1500 * 100,
        currency: "INR",
        receipt: nanoid(),
        payment_capture: "1"
    }
    razorPayInstance.orders.create(params)
        .then(async (response) => {
            // user details
            const token = req.cookies.spirit;
            const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
            const clint_detail=await client_model.findOne({_id:verifyUser._id})

           ////////////////// 

            const razorpayKeyId = process.env.key_id
            // Save orderId and other payment details
            const payment_data = new Payment_model({
                name:clint_detail.name,
                email:clint_detail.email,
                orderId: response.id,
                receiptId: response.receipt,
                amount: response.amount,
                currency: response.currency,
                createdAt: response.created_at,
                status: response.status
            })
            try {
                // Render Order Confirmation page if saved succesfully
                await payment_data.save()
                res.render('payments/checkout', {
                    title: "Confirm Order",
                    razorpayKeyId: razorpayKeyId,
                    payment_data: payment_data
                })
            } catch (err) {
                // Throw err if failed to save
                if (err) console.log(err);
                err;
            }
        }).catch((err) => {
            // Throw err if failed to create order
            if (err) console.log(err);

        })
});

/**
 * Verify Payment
 * 
 */
router.post('/verify', async function (req, res, next) {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    let expectedSignature = crypto.createHmac('sha256', process.env.key_secret)
        .update(body.toString())
        .digest('hex');

    // Compare the signatures
    console.log(expectedSignature);
    console.log(req.body.razorpay_signature);


    if (expectedSignature === req.body.razorpay_signature) {
        console.log('hii');
        // if same, then find the previosuly stored record using orderId,
        // and update paymentId and signature, and set status to paid.
        // 
        const token = req.cookies.spirit;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        const clint_detail=await client_model.findOne({_id:verifyUser._id})
        // 
        const save_payment = await payment_model.findOneAndUpdate(
            { orderId: req.body.razorpay_order_id },
            {   Name:clint_detail.name,
                email:clint_detail.email,
                paymentId: req.body.razorpay_payment_id,
                signature: req.body.razorpay_signature,
                status: "paid"
            },
            { new: true }
            // function (err, doc) {
            //     // Throw er if failed to save
            //     // if (err) {
            //     //     // throw err
            //     //     console.log(err.message);

            //     // }
            //     // Render payment success page, if saved succeffully
            //     res.render('payments/success', {
            //         title: "Payment verification successful",
            //         paymentDetail: doc
            //     })
            // }
        );

        if (!save_payment) {
            console.log('not fount');

        } else {
            // Create your invoice! Easy!
            //  token = req.cookies.spirit;
            //  verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
           const  client = await client_model.findOneAndUpdate({ _id: verifyUser._id }
            ,{
                payment_status:"paid",
                paymentId: req.body.razorpay_payment_id,
                signature: req.body.razorpay_signature,
            });
            

           
            // easyinvoice.createInvoice(data,async function (result) {
            // The response will contain a base64 encoded PDF file
            // console.log('PDF base64 string: ', result.pdf);
            // await fs.writeFileSync("invoice.pdf", result.pdf,'base64')

            // Now this result can be used to save, download or render your invoice
            // Please review the documentation below on how to do this
            // });

            res.render('payments/success', { paymentDetail: save_payment })
        }
    } else {
        res.render('payments/fail', {
            title: "Payment verification failed",
        })
    }
});

export default router;