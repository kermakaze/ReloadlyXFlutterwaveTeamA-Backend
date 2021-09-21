const ResponseUtils = require('../utils/ResponseUtils');
const EmailUtils = require('../utils/EmailUtils');

const Beneficiary = require('../models/Beneficiary');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

async function generatePasswordHash(password, numRounds){
    const salt = await bcrypt.genSalt(numRounds);//Make it computationally hard

    return  await bcrypt.hash(password, salt);
}
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
    },

    async sendPasswordReset(req, res){
        const token = crypto.randomBytes(21).toString('hex');

        const user = await Beneficiary.findOneAndUpdate({email: req.body.email},{passwordResetToken: token},{new:true});
        if(!user){

            return ResponseUtils.sendError(res,401, "No account exists for the email provided: " + req.body.email);
        }

        const link =  `${process.env.BASE_URL}/api/validate-password/${token}`
        await EmailUtils.sendEmailWithSendGrid(user.email,"Please reset your password",
            "Please click on this link to reset your password\n\n" + link);


       res.send({
           success: true,
           link: `${process.env.BASE_URL}/api/validate-password/${token}`
       })

    },


    async validatePasswordResetToken(req, res){
        const token = req.params['token'];
        let user = await Beneficiary.findOne({passwordResetToken: token});
        if(!user) {
            return ResponseUtils.sendError(res,403, 'Link could not be verified, please try again!');

        }
       res.redirect('https://redeemfund-emalindahk.vercel.app/change-password/' + token);

        
    },

    async setNewPassword(req, res){
        const token = req.params['token'];
        let user = await Beneficiary.findOne({passwordResetToken: token});
        if(!user) {
            return ResponseUtils.sendError(res,403, 'Link could not be verified, please try again!');

        }

        await Beneficiary.findByIdAndUpdate(user.id, {
            passwordHash: await generatePasswordHash(req.body.password, 10)});

        ResponseUtils.sendGenericResponse(res)
    }

}