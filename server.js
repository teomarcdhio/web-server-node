const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res ) => {
  res.render('home.hbs',{
    pageTitle: 'The home page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hey welcome you!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'The About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Ooops, something went wrong!'
  })
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
