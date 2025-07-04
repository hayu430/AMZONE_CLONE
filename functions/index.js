
const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const cors = require('cors');
const { Message } = require("firebase-functions/pubsub");

const app = express()

app.use(cors({ origin: true }));
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'success',
    });

}) ;
app.post('/payment/create',async(req,res)=>{
const total= parseInt(req.query.total);
if(total && total >0){
 const paymentIntent=await stripe.paymentIntents.create({
    amount:total,
    currency:"usd"
 })

 res.status(201).json({
    client_secret:paymentIntent.client_secret
 })
}else{

    res.status(400).send({error:"invalid or mising total amount "})
}

})                                                            


exports.api = onRequest(app);

