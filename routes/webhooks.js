const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/PaymentController');



router.post('/flutterwave_webhook', PaymentController.validatePaymentForCampaign);


module.exports = router;