const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-tracker');

var exphbs = require('express-handlebars');


const Charity = mongoose.model('Charity', {
  org: String
});


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// let charities = [
//   { org: "Humane Society" },
//   { org: "Childrens Hospital" },
//   { org: "Childrens Hospital" },
//   { org: "Childrens Hospital" },
//   { org: "Childrens Hospital" }
// ]

// INDEX
// app.get('/', (req, res) => {
//   res.render('charities-index', { charities: charities });
// })

app.get('/', (req, res) => {
    Charity.find()
        .then(charities => {
            res.render('charities-index', {charities: charities})
        })
        .catch(err => {
            console.log(err)
        })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
