const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InquirySchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    subject: {type:String, required: true},
    message: {type:String, required: true},

}, {collection: "inquiries", timestamps: true});


InquirySchema.set('toJSON', {virtuals: true});
InquirySchema.set('toObject', {virtuals: true});


const Inquiry = mongoose.model('Inquiry', InquirySchema);

module.exports = Inquiry;
