
const db = require('../services/db.js');

const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const utils = require('../services/utils.js');





// create login function
async function login(req, res) {

  //create request route for post a sign in
  var sql = "SELECT * FROM PESSOA WHERE email = ? ";

  try {
    var values = [req.body.email, req.body.senha];


    var values_db = await db.query(sql, [req.body.email], function (err, result) {
      if (err) throw res.status(500).send('Erro ao realizar login 1 ');
      // console.log(result);
    });

    if (await bcrypt.compare(req.body.senha, values_db[0].senha)) {
      //create token
      var token = jwt.sign({ id: values_db[0].id }, process.env.JWT_KEY, { expiresIn: '1h', nome: values_db[0].nome });
      return res.json({ message: "Sucesso na autenticação", token: token, result: true });


    }

    return res.json({ message: "Falha na autenticação", result: false });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar login 2');
  }

}







async function singup(req, res) {
  //create request route for post a sign up

  //handle error

  try {
    var sql = "INSERT INTO PESSOA (nome, email, senha, sexo) VALUES (?, ?, ?, ?)";
    var values = [req.body.nome, req.body.email, req.body.senha, req.body.sexo];

    //TODO: verificação de senha e outros campos 

    // encript password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.senha, salt);
    values[2] = hash;
    console.log(values)
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


async function getById(req, res) {
  //create request route for get a pessoa
  var sql = "SELECT * FROM PESSOA WHERE id = ?";
  var values = req.params.id;
  values_db = utils.getQuery(sql, values);
  res.json(values_db);

}

async function getByEmail(req, res) {
  //create request route for get a pessoa
  var sql = "SELECT * FROM PESSOA WHERE email = ?";
  var values = req.params.email;
  values_db = utils.getQuery(sql, values);
  res.json(values_db);

}

async function deletePessoa(req, res) {
  //create request route for delete a pessoa
  var sql = "DELETE FROM PESSOA WHERE id = ?";
  var values = [req.params.id];
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  }
  );
  res.send("1 record deleted");

}


async function updatePessoa(req, res) {
  //create request route for update a pessoa
  let sql = "UPDATE PESSOA SET nome = ?, email = ?, senha = ?, sexo = ? WHERE id = ?";
  let values = [req.body.nome, req.body.email, req.body.senha, req.body.sexo, req.params.id];
  utils.insertDB(sql, values);
}

async function getAllPessoas(req, res) {
  //create request route for get all pessoa
  var sql = "SELECT * FROM PESSOA";
  var values = [];
  values_db = utils.getQuery(sql, values);
  res.json(values_db);

}



// TODO: Como avaliar? 


async function avaliar(id_usuario, avaliacao) {
  //update nota from pessoa

  let sql = "SELECT nota, num_avaliacoes FROM PESSOA WHERE id = ?";
  let values = [id_usuario];
  try {
    values_db = await db.query(sql, values, function (err, result) {
      if (err) throw res.status(500).send('Erro ao buscar nota da pessa');
      console.log(result);
    });
    nota_nova = req.body.nota;

    num_avaliacoes = values_db[0].num_avaliacoes + 1;
    nota_atualizada = (nota_nova + values_db[0].nota) / num_avaliacoes;
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar busca');
  }

  sql = "UPDATE PESSOA SET nota = ?, num_avaliacoes = ? WHERE id = ?";

  values = [nota_atualizada, num_avaliacoes, req.body.id];
  utils.insertDB(sql, values);
  res.send("1 record updated");

}

async function getNota(req, res) {
  //get nota from pessoa
  let sql = "SELECT nota FROM PESSOA WHERE id = ?";
  let values = req.params.id;
  values_db = utils.getQuery(sql, params);
  res.json(values_db);

}

async function avaliarUsuariosCarona(req, res) {
  //update nota from pessoa
  
  for (e of req.body.avaliacoes) {
    //select usuario and update nota
    avaliar(e.id_usuario, e.avaliacao);
    let sql = "SELECT * CARONA_USUARIO WHERE id_usuario = ? AND id_carona = ?";
    let values = [e.id_usuario, e.id_carona];
    values_db = utils.getQuery(sql, values);
    if (values_db.length == 0) {
      //insert carona_usuario
      sql = "INSERT INTO CARONA_USUARIO_AVALIACAO (id, nota,comentario) VALUES (?, ?, ?)";
      values = [values_db[0].id, e.avaliacao,e.observacao];
      utils.insertDB(sql, values);
    }

    
  } 
}




module.exports = {
  singup,
  login,
  deletePessoa,
  getById,
  getByEmail,
  updatePessoa,
  getAllPessoas,
  avaliar,
  getNota,
  avaliarUsuariosCarona




};


