const ResponseUtils = require('../utils/ResponseUtils');
const Beneficiary = require('../models/Beneficiary');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    async login(req, res) {

        const loginData = req.body;

        try {
            let user = await Beneficiary.findOne({email: loginData.email});

            if (!user) {
                return ResponseUtils.sendError(res, 403, "No account found matching this credentials");
            } else {
                //Password hashes do not match
                if (!await bcrypt.compare(loginData.password, user.passwordHash))
                    return ResponseUtils.sendError(res, 403, "Incorrect Password");
            }


            const payload = {
                id: user.id
            };
            const token = jwt.sign(payload, process.env.APP_SECRET, {});
            res.send({
                id: user.id,
                accessToken: token
            });

        } catch (err) {
            console.error(err);
            ResponseUtils.sendServerError(res);
        }


    },

    async register(req, res) {

        const registerData = req.body;

        const salt = await bcrypt.genSalt(10);//Make it computationally hard

        registerData['passwordHash'] = await bcrypt.hash(registerData['password'], salt);

        try {
            //TODO enforce validation
            const user = await Beneficiary.create({
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email,
                passwordHash: registerData['passwordHash']
            });
            if (!user) {
                return ResponseUtils.sendServerError(res);
            }
            const payload = {
                id: user.id
            };
            const token = jwt.sign(payload, process.env.APP_SECRET, {});
            res.send({
                id: user.id,
                accessToken: token
            });

        } catch (err) {
            console.error(err.code);
            if (err.code === 11000) {//Mongo DB code for unique constraint violation
                return ResponseUtils.sendError(res, 409, "A user with this email already exists");
            }

            ResponseUtils.sendServerError(res);
        }
    }


}