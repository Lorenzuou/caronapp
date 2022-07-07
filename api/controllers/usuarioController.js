
const db = require('../services/db.js');

const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');






// create login function
async function login(req, res) {

  //create request route for post a sign in
  var sql = "SELECT * FROM PESSOA WHERE email = ? AND senha = ?";

  try {
    var values = [req.body.email, req.body.senha];
    var values_db = await db.query(sql, values, function (err, result) {
      if (err) throw res.status(500).send('Erro ao realizar login');
      console.log(result);
    });

    if (await bcrypt.compare(req.body.senha, values_db[0].senha)) {
      //create token
      var token = jwt.sign({ id: values_db[0].id }, process.env.JWT_KEY, { expiresIn: '1h' });
      return res.json({ message: "Sucesso na autenticação", token: token });


    }

    return res.status(401).send('Usuário ou senha inválidos');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar login');
  }

}







async function singup(req, res) {
  //create request route for post a sign up

  //handle error

  try {
    var sql = "INSERT INTO PESSOA (nome, email, senha, sexo) VALUES (?, ?, ?, ?)";
    var values = [req.body.nome, req.body.senha, req.body.email, req.body.sexo];

    //TODO: verificação de senha e outros campos 

    // encript password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.senha, salt);
    values[2] = hash;

    db.query(sql, values, function (err, result) {
      if (err) throw err;
      else res.json({ 'message': 'Usuário cadastrado com sucesso!', 'usuarioCriado': values[0] });
    }
    );
    res.status(201).send('Usuário cadastrado com sucesso!');

  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar cadastro');
  }




}

async function singin(req, res) {
  //create request route for post a sign in
  var sql = "SELECT * FROM PESSOA WHERE email = ? AND senha = ?";

  try {
    var values = [req.body.email, req.body.senha];
    db.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }

}






module.exports = {
  singup,
  singin,

};


