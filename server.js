const app = require('./config/express.js')();
const port = app.get('port')
//require routes 
const routes = require('api/routes/routes.js')(app);

console.log("Server running on port " + port);


app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({'message': 'Api server is running'});
})


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