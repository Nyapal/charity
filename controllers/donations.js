const Donation = require('../models/donations.js')

function donations (app) {
    app.post('/charities/donations', (req, res) => {
        Donation.create(req.body).then(donation => {
            res.redirect(`/charities/${donation.charityId}`)
        }).catch((err) => {
            console.log(err.message)
        })
    })

    app.delete('/charities/donations/:id', function (req, res) {
        console.log("DELETE comment")
        Donation.findByIdAndRemove(req.params.id).then((donation) => {
            res.redirect(`/charities/${donation.charityId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
module.exports = donations
