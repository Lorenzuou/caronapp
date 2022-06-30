
query = require('../services/db.js');

async function singup(req, res) {
  //create request route for post a sign up
  
    var sql = "INSERT INTO PESSOA (nome, email, senha, sexo) VALUES (?, ?, ?)";
    var values = [req.body.nome, req.body.email, req.body.senha];
    // print the values to the console
    console.log(values);

    query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    res.send("1 record inserted");
  
 
}

async function singin(req, res) {
  //create request route for post a sign in
  var sql = "SELECT * FROM PESSOA WHERE email = ? AND senha = ?";
  var values = [req.body.email, req.body.senha];
  query(sql, values, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}






module.exports = {
  singup,
  singin,

};


