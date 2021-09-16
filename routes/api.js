const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");


router.get('/', (req, res)=> res.send('RedeemFundApi v1.0'))


//Authentication Routes
router.post('/login',AuthController.login);
router.post('/register',AuthController.register);

module.exports = router;