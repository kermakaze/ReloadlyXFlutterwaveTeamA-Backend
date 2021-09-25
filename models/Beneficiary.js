const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BeneficiarySchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type:String, required: true, unique: true},

    passwordHash: {type: String, required: true},
    passwordResetToken: {type: String, required: false},

    emailVerified: {type: Boolean, required: true, default: false},

    phoneNumber: {type: String, required: false},
    countryCode: {type: String, required: false},
    countryName: {type: String, required: false},

    profilePhotoS3: {type: String, required: false}



}, {collection: "beneficiaries", timestamps: true});


BeneficiarySchema.set('toJSON', {virtuals: true});
BeneficiarySchema.set('toObject', {virtuals: true});


const Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);

module.exports = Beneficiary;
