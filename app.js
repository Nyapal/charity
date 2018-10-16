const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/charity-tracker');

var exphbs = require('express-handlebars');


const Charity = mongoose.model('Charity', {
  org: String
});


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
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

app.get('/charities/new', (req, res) => {
  res.render('charities-new', {});
})

app.post('/charities', (req, res) => {
    Charity.create(req.body).then((charity) => {
        console.log(charity)
        res.redirect(`/charities/${charity._id}`)
    }).catch((err) => {
        console.log(err.message)
    })
})

app.get('/charities/:id', (req, res) => {
  Charity.findById(req.params.id).then((charity) => {
      res.render('charities-show', {charity: charity})
  }).catch((err) => {
      console.log(err.message)
  })
});

app.get('/charities/:id/edit', (req, res) => {
    Charity.findById(req.params.id, function(err, charity) {
        res.render('charities-edit', {charity: charity})
    })
})

app.put('/charities/:id', (req, res) => {
    Charity.findByIdAndUpdate(req.params.id, req.body)
        .then(charity => {
            res.redirect(`/charities/${charity._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
