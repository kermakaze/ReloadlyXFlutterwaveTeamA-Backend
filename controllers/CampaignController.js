
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
                beneficiary: req.decoded.id,//Gotten from JWT decoding
                coverPictureS3: req.body.coverPictureS3,
                fundType: req.body.fundType
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
        let campaigns = await Campaign.find().populate('beneficiary', '-passwordHash -passwordResetToken');//TODO add filters and pagination
        res.send(campaigns);
    },

    async getCampaignBySlug(req, res) {
        let campaign = await Campaign.findOne({slug: req.params['campaign_slug']}).find().populate('beneficiary', '-passwordHash -passwordResetToken')
        res.send(campaign);
    }

}