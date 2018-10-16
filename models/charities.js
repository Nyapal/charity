const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Charity = mongoose.model('Charity', {
    org: String
});

module.exports = Charity
