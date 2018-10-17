const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const charities = require('./controllers/charities.js')
const donations = require('./controllers/donations.js')
const app = express()
const Charity = require('./models/charities')
const Donation = require('./models/donations')
const mongoose = require('mongoose')
var exphbs = require('express-handlebars');

mongoose.connect('mongodb://localhost/charity-tracker');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

charities(app)
donations(app)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
