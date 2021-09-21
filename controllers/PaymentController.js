const ResponseUtils = require('../utils/ResponseUtils');
const Beneficiary = require('../models/Beneficiary');
const PaymentUtils = require('../utils/PaymentUtils');

module.exports = {

    async getPaymentLinkForCampaign(req, res) {
        try {
            let amount = req.body.amount;
            const refNo = PaymentUtils.randomAlphaString(15);

            const link = await PaymentUtils.getFlutterwavePaymentLink(refNo,
                req.body['phoneNumber'],
                amount,
                req.body['fullName'],
                req.body['email'])

            res.send({paymentRedirectLink:link});
        }
        catch (e) {
            console.error(e);
        }
    },

    async validatePaymentForCampaign(req, res) {

    }


}