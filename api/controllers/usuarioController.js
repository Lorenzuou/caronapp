
const db = require('../services/db.js');

const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const utils = require('../services/utils.js');





// create login function
async function login(req, res) {

  //create request route for post a sign in
  var sql = "SELECT * FROM USUARIO WHERE email = ? ";

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
    var sql = "INSERT INTO USUARIO (nome, email,cpf, senha, sexo,telefone) VALUES (?, ?,?, ?, ?,?)";
    var values = [req.body.nome, req.body.email, req.body.cpf, req.body.senha, req.body.sexo, req.body.telefone];

    //TODO: verificação de senha e outros campos 

    // encript password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.senha, salt);
    values[3] = hash;
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


async function getUserById(req, res) {
  //create request route for get a USUARIO
  var sql = "SELECT * FROM USUARIO WHERE id = ?";
  var values = req.params.id;
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });
}

async function getFotoUsuario(req, res) {
  //get foto from USUARIO
  let sql = "SELECT foto FROM USUARIO WHERE id = ?";
  let values = [req.body.id];
  utils.getQuery(sql, values).then(function (result) {
    //convert result to base64
    var base64 = Buffer.from(result[0].foto).toString('base64');
    res.json({ "foto": base64 });
  });
}



async function addFotoUsuario(req, res) {
  //add foto to USUARIO
  let sql = "UPDATE USUARIO SET foto = ? WHERE id = ?";

  let values = [req.body.foto, req.body.id];

  //convert req.body.foto to Blob format
  utils.insertDB(sql, values).then(function (result) {
    res.json(result);
  });
}


async function addDocumentacaoUsuario(req, res) {
  // UPDATE USUARIO seting documentacao
  let sql = "UPDATE USUARIO SET documentacao = ? WHERE id = ?";
  let values = [req.body.documentacao, req.params.id];
  utils.insertDB(sql, values).then(function (result) {
    res.json(result);
  });

}

async function getByEmail(req, res) {
  //create request route for get a USUARIO
  var sql = "SELECT * FROM USUARIO WHERE email = ?";
  var values = req.params.email;
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });

 

}

async function deleteUSUARIO(req, res) {
  //create request route for delete a USUARIO
  var sql = "DELETE FROM USUARIO WHERE id = ?";
  var values = [req.params.id];
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  }
  );
  res.send("1 record deleted");

}


async function updateUSUARIO(req, res) {
  //create request route for update a USUARIO
  let sql = "UPDATE USUARIO SET nome = ?, email = ?, senha = ?, sexo = ? WHERE id = ?";
  let values = [req.body.nome, req.body.email, req.body.senha, req.body.sexo, req.params.id];
  utils.insertDB(sql, values);
}

async function getAllUSUARIOs(req, res) {
  //create request route for get all USUARIO
  var sql = "SELECT * FROM USUARIO";
  var values = [];
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });

}



// TODO: Como avaliar? 


async function avaliar(id_usuario, avaliacao) {
  //update nota from USUARIO

  let sql = "SELECT nota, num_avaliacoes FROM USUARIO WHERE id = ?";
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

  sql = "UPDATE USUARIO SET nota = ?, num_avaliacoes = ? WHERE id = ?";

  values = [nota_atualizada, num_avaliacoes, req.body.id];
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });



}

async function getNota(req, res) {
  //get nota from USUARIO
  let sql = "SELECT nota FROM USUARIO WHERE id = ?";
  let values = req.params.id;
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });
  

}




async function avaliarUsuariosCarona(req, res) {
  //update nota from USUARIO

  for (e of req.body.avaliacoes) {
    //select usuario and update nota
    avaliar(e.id_usuario, e.avaliacao);
    let sql = "SELECT * CARONA_USUARIO WHERE id_usuario = ? AND id_carona = ?";
    let values = [e.id_usuario, e.id_carona];
    values_db = utils.getQuery(sql, values);
    if (values_db.length == 0) {
      //insert carona_usuario
      sql = "INSERT INTO CARONA_USUARIO_AVALIACAO (id, nota,comentario) VALUES (?, ?, ?)";
      values = [values_db[0].id, e.avaliacao, e.observacao];
      utils.insertDB(sql, values).then(function (result) {
        res.json(result);
      });
    }


  }
}

async function getAvaliaoesUsuario(req, res) {
  //get nota from USUARIO
  let sql = "SELECT * FROM CARONA_USUARIO_AVALIACAO WHERE id_usuario = ?";
  let values = req.params.id;
  values_db = utils.getQuery(sql, values);

  //for each id_usuario, select nome and foto 
  let sql2 = "SELECT nome, foto FROM USUARIO WHERE id = ?";
  values_return = [];
  for (e of values_db) {
    values = [e.id_usuario];
    values_db2 = utils.getQuery(sql2, values);
    e.nome = values_db2[0].nome;
    e.foto = values_db2[0].foto;
    values_return.push(e);
  }
  res.json(values_return);

  res.json(values_db);
}


async function getVeiculosUsuario(req, res) {
  //get veiculos from USUARIO from VEICULO_USUARIO table
  let sql = "SELECT * FROM VEICULO_USUARIO WHERE id_usuario = ?";
  let values = req.params.id;
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });
}


// async function addVeiculoUsuario(req, res) {
  
//   console.log(req.body);
//   //add veiculo to USUARIO with all the vehicle info
//   // let sql = "INSERT INTO VEICULO_USUARIO (usuario_id, marca, modelo, ano, placa, cor, renavam) VALUES (?, ?, ?, ?, ?, ?, ?)";
//   // let values = [req.body.usuario_id, req.body.marca, req.body.modelo, req.body.ano, req.body.placa, req.body.cor, req.body.renavam];
//   // console.log(values);
//   // utils.insertDB(sql, values).then(function (result) {
//   //   res.json(result);
//   // });

// }





module.exports = {
  singup,
  login,
  deleteUSUARIO,
  getByEmail,
  updateUSUARIO,
  getAllUSUARIOs,
  avaliar,
  getNota,
  avaliarUsuariosCarona,
  getAvaliaoesUsuario,
  getFotoUsuario,
  addFotoUsuario,
  getVeiculosUsuario,
  
  getUserById,
  addDocumentacaoUsuario






};


