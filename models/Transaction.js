const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    amount: {type: Number, required: true},
    flutterReferenceNo: {type: String, required: true},
    transactionStatus: {type: String, enum:['SUCCESS', 'PENDING','FAILED']},
    paymentType: {type: String, enum: ['MOBILE_MONEY', 'CARD']},
    campaign: {type: String, ref: 'Campaign'}

}, {collection: "transactions", timestamps: true});



TransactionSchema.set('toJSON', {virtuals: true});
TransactionSchema.set('toObject', {virtuals: true});


const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
