const expres = require('express');
const bodyParser = require('body-parser');

const app = expres();
const port = process.env.PORT || 3000;
const routes = require('./api/routes/routes');

console.log("Server running on port " + port);

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





/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});






var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "lorenzo",
  password: "senha"
});




con.connect(function(err) {
  if (err) throw err;
  else console.log("Conectado ao banco de dados!");
});






app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});















