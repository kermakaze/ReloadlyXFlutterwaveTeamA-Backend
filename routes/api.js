const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const CampaignController = require('../controllers/CampaignController');
const UserController = require('../controllers/UserController');
const Auth = require('../middleware/auth');

router.get('/', (req, res)=> res.send('RedeemFundApi v1.0'))


//Authentication Routes
router.post('/login',AuthController.login);
router.post('/register',AuthController.register);


//Routes beneath this require authentication
router.use(Auth.checkAuth)

//Campaign routes
router.route('/campaigns')
    .post(CampaignController.addCampaign)
    .get(CampaignController.getCampaigns);


//User Routes
router.get('/beneficiary/:id', UserController.getProfile);

module.exports = router;