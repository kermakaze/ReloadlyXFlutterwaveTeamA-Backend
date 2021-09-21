const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/PaymentController');



router.get('/flutterwave_webhook', PaymentController.getPaymentLinkForCampaign);


module.exports = router;