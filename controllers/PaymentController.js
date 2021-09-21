const ResponseUtils = require('../utils/ResponseUtils');
const Beneficiary = require('../models/Beneficiary');
const Campaign = require('../models/Campaign');

const Transaction = require('../models/Transaction');

const PaymentUtils = require('../utils/PaymentUtils');

module.exports = {

    async getPaymentLinkForCampaign(req, res) {
        try {
            let amount = req.body.amount;
            let campaign = await Campaign.findOne({slug: req.params['campaign_slug']})

            const refNo = PaymentUtils.randomAlphaString(15);

            const link = await PaymentUtils.getFlutterwavePaymentLink(refNo,
                req.body['phoneNumber'],
                amount,
                req.body['fullName'],
                req.body['email'])

            await Transaction.create({
                campaign: campaign.id,
                paymentType: 'CARD',
                flutterReferenceNo: refNo,
                amount: amount
            })
            res.send({paymentRedirectLink: link});
        } catch (e) {
            console.error(e);
            ResponseUtils.sendServerError(res);
        }
    },

    async validatePaymentForCampaign(req, res) {
        ResponseUtils.sendGenericResponse(res)//End as soon an possible

        try {
            //console.log(req.body);
            const ref = req.body.data['tx_ref'];

            const transaction = await Transaction
                .findOneAndUpdate({flutterReferenceNo: ref}, {
                    transactionStatus: 'SUCCESS',
                    paymentType: req.body.data['payment_type'] === "card" ? "CARD" : 'MOBILE_MONEY'
                });


            //Increase campaign amount
            await Campaign.findByIdAndUpdate(transaction.campaign, {
                $inc: { currentAmount: transaction.amount }
            });

        } catch (e) {
            console.error(e)
        }


    }


}