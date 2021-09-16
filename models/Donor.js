const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DonorSchema = new Schema({
    name: {type:String, required: true},

}, {collection: "donors", timestamps: true});


DonorSchema.set('toJSON', {virtuals: true});
DonorSchema.set('toObject', {virtuals: true});


const Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
