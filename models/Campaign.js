const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const slug = require('mongoose-slug-generator');


mongoose.plugin(slug);
const CampaignSchema = new Schema({
    title: {type:String, required: true},
    slug: {type: String, slug: "title"},
    description:{type:String, required: true},
    goalAmount: {type: Number, required: true},//Funds are in USD

    currentAmount: {type: Number, required: true, default: 0},//Funds are in USD

    status: {type: String, enum: ['ONGOING','CLOSED','FULLY_FUNDED'], default:'ONGOING'},

    type: {type: String, enum: ['NANO_DEGREE','AIRTIME', 'OTHER']},//TODO add types more as idea matures

    beneficiary: {type: String, ref: 'Beneficiary', required: true},

    coverPictureS3:{type: String, required: false},
    platform: {type: String, required: false}


}, {collection: "campaigns", timestamps: true});

CampaignSchema.index({title: 'text'});

CampaignSchema.set('toJSON', {virtuals: true});
CampaignSchema.set('toObject', {virtuals: true});


const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
