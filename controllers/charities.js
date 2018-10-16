const Charity = require('../models/charities.js')
function charities (app) {

    app.get('/', (req, res) => {
      Charity.find()
        .then(charities => {
          res.render('charities-index', {charities: charities});
        })
        .catch(err => {
          console.log(err);
        });
    });

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

    app.delete('/charities/:id', function (req, res) {
      console.log("DELETE review")
      Charity.findByIdAndRemove(req.params.id).then((charity) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
    })

}

module.exports = charities
