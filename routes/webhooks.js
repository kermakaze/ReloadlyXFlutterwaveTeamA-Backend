const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const CampaignController = require('../controllers/CampaignController');
const UserController = require('../controllers/UserController');
const Auth = require('../middleware/auth');

router.get('/flutterwave_webhook', (req, res)=> res.send('RedeemFundApi v1.0'))


module.exports = router;