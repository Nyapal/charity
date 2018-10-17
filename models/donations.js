const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Donation = mongoose.model('Donation', {
    date: Date,
    amount: String,
    charityId: {type: Schema.Types.ObjectId, ref: 'Charity'}
});

module.exports = Donation
