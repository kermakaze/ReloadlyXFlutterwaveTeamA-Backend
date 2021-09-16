const Campaign = require('../models/Campaign');
const ResponseUtils = require('../utils/ResponseUtils');

module.exports = {
    async addCampaign(req, res){
        try {
            await Campaign.create({
                title: req.body.title,
                description: req.body.description,
                goalAmount: req.body.goalAmount,
                type: req.body.type,
                beneficiary: req.decoded.id//Gotten from JWT decoding
            })

            ResponseUtils.sendGenericResponse(res)
        }
        catch (e) {
            console.error(e);
            ResponseUtils.sendServerError(res);
        }
    },

    async editCampaign(req, res){

    },

    async getCampaigns(req, res){
        let campaigns = await Campaign.find();//TODO add filters and pagination
        res.send(campaigns);
    }
}