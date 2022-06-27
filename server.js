const app = require('./config/express.js')();
const port = app.get('port')


console.log("Server running on port " + port);

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "lorenzo",
  password: "senha"
});


console.log("Conectado ao banco de dados");


con.connect(function(err) {
  if (err) throw err;
  console.log("Connectado!");
});


//create request route for post a sign up
app.post('/signup', function(req, res) {
  var sql = "INSERT INTO PESSOA (nome, email, senha) VALUES (?, ?, ?)";
  var values = [req.body.nome, req.body.email, req.body.senha];
  // print the values to the console
  console.log(values);

  con.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  res.send("1 record inserted");
}
);


//create request route for post a sign in
app.post('/signin', function(req, res) {
  var sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  var values = [req.body.email, req.body.password];
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
);

//create get route that gets all the caronas from the database
app.get('/caronas', function(req, res) {
  var sql = "SELECT * FROM carona";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
);


















app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});