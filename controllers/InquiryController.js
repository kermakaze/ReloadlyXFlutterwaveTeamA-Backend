const EmailUtils = require('../utils/EmailUtils');
const ResponseUtils = require('../utils/ResponseUtils');

const Inquiry = require('../models/Inquiry');


module.exports = {
    async sendInquiryEmail(req, res){
        try {
            let inquiry = await Inquiry.create({
                name: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message
            });


            await EmailUtils.sendEmailWithSendGrid(process.env.ADMIN_EMAIL,
                "RedeemFund Inquiry: "+inquiry.name +", " + inquiry.subject,
                "Message: " + inquiry.message + "\n\n Reply to: " + inquiry.email);

            ResponseUtils.sendGenericResponse(res);
        }
        catch (e) {
            console.error(e);
            ResponseUtils.sendServerError(res);
        }
    }
}