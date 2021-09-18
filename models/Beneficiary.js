const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BeneficiarySchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    emailVerified: {type: Boolean, required: true, default: false}



}, {collection: "beneficiaries", timestamps: true});


BeneficiarySchema.set('toJSON', {virtuals: true});
BeneficiarySchema.set('toObject', {virtuals: true});


const Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);

module.exports = Beneficiary;
