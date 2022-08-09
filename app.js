const express = require('express');
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();
app.use((express.json({limit: '20mb'})));
const port = process.env.PORT || 8080;
const routes = require('./api/routes/routes');


app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});


// Use as linhas abaixo para deixar o servidor online 

ngrok = require('ngrok');
ngrok.connect({
  proto : 'http',
  addr : port,
}, (err, url) => {
  if (err) {
      console.error('Error while connecting Ngrok',err);
      return new Error('Ngrok Failed');
  }
});



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({'message': 'Api server is running'});
})








function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}






