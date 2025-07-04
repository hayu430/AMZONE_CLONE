
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

})                                                             


exports.api = onRequest(app);

