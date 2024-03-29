
const db = require('../services/db.js');

const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const utils = require('../services/utils.js');
const { util } = require('config');
const e = require('express');




async function hashIt(word) {
  var salt = await bcrypt.genSaltSync(10);
  var hash = await bcrypt.hashSync(word, salt);
  return hash;
}


// create login function
async function login(req, res) {

  //create request route for post a sign in
  var sql = "SELECT * FROM USUARIO WHERE email = ? ";

  try {
    var values = [req.body.email, req.body.senha];


    var values_db = await db.query(sql, [req.body.email], function (err, result) {
      if (err) throw res.status(500).send({ error: 'Erro ao realizar login 1 ' });
      // console.log(result);
    });
    if (values_db.length > 0) {


      if (await bcrypt.compare(req.body.senha, values_db[0].senha)) {
        var token = jwt.sign({ id: values_db[0].id }, process.env.JWT_KEY, { expiresIn: '1h' });
        console.log(token);
        return res.json({ message: "Sucesso na autenticação", id: values_db[0].id, nome: values_db[0].nome, email: values_db[0].email, token: token });

      } else {
        return res.status(400).send({ error: "Usuário ou senha inválidos" })
      }
    } else {


      return res.status(400).send({ error: "Usuário ou senha inválidos" });
    }

  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Falha na autenticação" });
  }

}


async function logOut(req, res) {
  // revoke token from body


}






async function signup(req, res) {
  //create request route for post a sign up

  //handle error

  try {
    var sql = "INSERT INTO USUARIO (nome, email,cpf, senha,telefone,foto) VALUES ( ?,?, ?, ?,?,?)";
    var values = [req.body.nome, req.body.email, req.body.cpf, req.body.senha, req.body.telefone, req.body.foto == null ? null : req.body.foto];

    //verify if email already exists
    var sql_verify = "SELECT * FROM USUARIO WHERE email = ?";
    var values_verify = [req.body.email];
    var result_verify = await db.query(sql_verify, values_verify);
    if (result_verify.length > 0) {
      return res.status(400).send({ 'error': "Email já cadastrado" });
    }


    //verify if cpf already exists
    var sql_verify = "SELECT * FROM USUARIO WHERE cpf = ?";
    var values_verify = [req.body.cpf];
    var result_verify = await db.query(sql_verify, values_verify);
    if (result_verify.length > 0) {
      return res.status(400).send({ 'error': "CPF já cadastrado" });
    }


    // encript password
    var hash = await hashIt(req.body.senha);
    values[3] = hash;

    //insert into db
    utils.insertDB(sql, values).then(function (result) {

      if (result.error) {
        return res.status(400).send({ error: "Erro ao cadastrar usuário" });
      } else {

        res.status(201).send('Usuário cadastrado com sucesso!');
      } //end else

    });
  }


  catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar cadastro');
  }
}


async function getUsuarioById(req, res) {
  //create request route for get a USUARIO
  var sql = "SELECT * FROM USUARIO WHERE id = ?";

  let usuario_id = await utils.getIdUsuarioToken(req);
  let values = [usuario_id];
  utils.getQuery(sql, values).then(function (result) {
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(400).send({ 'error': 'Usuário não encontrado' });
    }


  });
}

async function getFotoUsuario(req, res) {
  //get foto from USUARIO
  let sql = "SELECT foto FROM USUARIO WHERE id = ?";
  let usuario_id = await utils.getIdUsuarioToken(req);
  utils.getQuery(sql, usuario_id).then(function (result) {
    //convert result to base64
    if (result.length > 0) {

      let base64 = utils.getFoto(result[0].foto);
      res.json({ "foto": base64 });
    } else {
      res.json({ "foto": null });
    }

  });
}



async function addFotoUsuario(req, res) {
  //add foto to USUARIO
  let sql = "UPDATE USUARIO SET foto = ? WHERE id = ?";

  let values = [req.body.foto, req.body.id];

  //convert req.body.foto to Blob format
  let foto = utils.getFoto(req.body.foto);
  values[0] = foto;

  utils.insertDB(sql, values).then(function (result) {
    res.json(result);
  });
}


async function addDocumentacaoUsuario(req, res) {
  // UPDATE USUARIO seting documentacao
  let usuario = utils.getIdUsuarioToken(req);
  let sql = "UPDATE USUARIO SET cnh = ? WHERE id = ?";
  let values = [req.body.cnh, usuario];
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

async function deleteUsuario(req, res) {
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





async function avaliar(id_usuario, avaliacao) {
  //update nota from USUARIO

  let sql = "SELECT nota, num_avaliacoes FROM USUARIO WHERE id = ?";
  let values = [id_usuario];
  try {
    values_db = await db.query(sql, values, function (err, result) {
    });
    nota_nova = avaliacao;
    console.log(values_db[0].nota);
    num_avaliacoes = values_db[0].num_avaliacoes + 1;
    nota_atualizada = (nota_nova + values_db[0].nota) / 2;
    console.log(nota_atualizada)
  } catch (err) {
    console.log(err);
    return 'Erro ao realizar busca';
  }
  sql = "UPDATE USUARIO SET nota = ?, num_avaliacoes = ? WHERE id = ?";

  values = [nota_atualizada, num_avaliacoes, id_usuario];
  utils.getQuery(sql, values)//seta o valor da nota nova no banco de dados



}

async function getNota(req, res) {
  //get nota from USUARIO
  let sql = "SELECT nota FROM USUARIO WHERE id = ?";
  let values = req.params.usuario_id;
  utils.getQuery(sql, values).then(function (result) {
    res.json(result);
  });


}




async function avaliarUsuariosCarona(req, res) {
  //update nota from USUARIO
  for (e of req.body.avaliacoes) {
    //select usuario and update nota
    avaliar(e.usuario_id, e.avaliacao);
    let sql = "SELECT * FROM CARONA_USUARIO WHERE usuario_id = ? AND carona_id = ?";
    let values = [e.usuario_id, req.body.carona_id];
    values_db = await utils.getQuery(sql, values);
    console.log("values_db")
    console.log(values_db);
    if (values_db.length > 0) {
      //insert carona_usuario
      sql = "INSERT INTO CARONA_USUARIO_AVALIACAO (carona_usuario_id, nota,comentario) VALUES (?, ?, ?)";
      values = [values_db[0].id, e.avaliacao, e.observacao];
      console.log(values);
      await utils.insertDB(sql, values).then(function (result) {
      });
    }
  }
  res.json({ "message": "Avaliacao realizada com sucesso" });
}

async function getAvaliaoesUsuario(req, res) {
  //get nota from USUARIO
  let sql = "SELECT * FROM CARONA_USUARIO_AVALIACAO WHERE usuario_id = ?";
  let values = req.params.usuario_id;
  let values_db = await utils.getQuery(sql, values);

  //for each usuario_id, select nome and foto 
  let sql2 = "SELECT nome, foto FROM USUARIO WHERE id = ?";
  values_return = [];
  for (e of values_db) {
    values = [e.usuario_id];
    values_db2 = await utils.getQuery(sql2, values);
    e.nome = values_db2[0].nome;
    e.foto = values_db2[0].foto;
    values_return.push(e);
  }
  res.json(values_return);

  res.json(values_db);
}


async function getVeiculosUsuario(req, res) {
  let usuario = await utils.getIdUsuarioToken(req);
  if(usuario == null){
    res.status(400).send({ "error": "Usuario nao encontrado" });
  }


  //checking if usuario has the car on the database
  var sql = "SELECT * FROM VEICULO_USUARIO WHERE  usuario_id = ?";
  let params = [usuario];


  let veiculos = await utils.getQuery(sql, params);




  if (veiculos.length > 0) {
    let veiculos_lista = [];

    console.log(veiculos);

    for (veiculo of veiculos) {
      console.log(veiculo);
      var sql = "SELECT * FROM VEICULO WHERE id = ?";
      params = [veiculo.veiculo];
      let veiculo_origem = await utils.getQuery(sql, params);
      veiculo.foto = utils.getFoto(veiculo_origem[0].foto);
      veiculo.marca = veiculo_origem[0].marca;
      veiculo.modelo = veiculo_origem[0].nome;
      veiculo.espaco  = veiculo_origem[0].capacidade;
      veiculos_lista.push(veiculo);
    } 
    

    if (veiculos.error) {
      res.status(400).send({ "error": veiculos.error });
    } else {
      res.json(veiculos_lista);
    }


  }else{
    res.send([]);
  }
}






module.exports = {
  signup,
  login,
  deleteUsuario,
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
  getUsuarioById,
  addDocumentacaoUsuario






};


