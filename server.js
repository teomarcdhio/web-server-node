const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append log to file');
    };
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'maintenance page'
  });
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res ) => {
  res.render('home.hbs',{
    pageTitle: 'The home page',
    welcomeMessage: 'Hey welcome you!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'The About page'
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
