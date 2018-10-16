const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let charities = [
  { charity: "Humane Society" },
  { charity: "Childrens Hospital" },
  { charity: "Childrens Hospital" },
  { charity: "Childrens Hospital" },
  { charity: "Childrens Hospital" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('charities-index', { charities: charities });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
