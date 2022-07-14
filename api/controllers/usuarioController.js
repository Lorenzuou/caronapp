
const db = require('../services/db.js');

const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');






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

    console.log(values_db)
    if (await bcrypt.compare(req.body.senha, values_db[0].senha)) {
      //create token
      var token = jwt.sign({ id: values_db[0].id }, process.env.JWT_KEY, { expiresIn: '1h' });
      return res.json({ message: "Sucesso na autenticação", token: token });


    }

    return res.status(401).send('Usuário ou senha inválidos');
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
  var values = [req.params.id];
  try {
    var pessoa = await db.query(sql, values, function (err, result) {
      if (err) throw res.status(500).send('Erro ao buscar pessoa');
      console.log(result);
    }
    );
    res.json(pessoa);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar busca');
  }
}

async function getByEmail(req, res) {
  //create request route for get a pessoa
  var sql = "SELECT * FROM PESSOA WHERE email = ?";
  var values = [req.params.email];
  try {
    var pessoa = await db.query(sql, values, function (err, result) {
      if (err) throw res.status(500).send('Erro ao buscar pessoa');
      console.log(result);
    }
    );
    res.json(pessoa);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar busca');
  }
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
  try {
    db.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("1 record updated");
    }
    );
    res.send("1 record updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar atualização');
  }
}

async function getAllPessoas(req, res) {
  //create request route for get all pessoa
  var sql = "SELECT * FROM PESSOA";
  try {
    let values_db = db.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    }
    );

    res.json(values_db);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro do servidor');
  }
}



// TODO: Como avaliar? 


async function avaliar(req, res) {
  //update nota from pessoa
  let nota

  let sql = "SELECT nota, num_avaliacoes FROM PESSOA WHERE id = ?";
  let values = [req.body.id];
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
  db.query(sql, values, function (err, result) {
    if (err) throw res.status(500).send('Erro ao atualizar nota da pessoa');
    console.log(result);
  });

  res.send("1 record updated");

}

async function getNota(req, res) {
  //get nota from pessoa
  let sql = "SELECT nota FROM PESSOA WHERE id = ?";
  let values = [req.params.id]; 
  try {
    values_db = await db.query(sql, values, function (err, result) {
      if (err) throw res.status(500).send('Erro ao buscar nota da pessa');
      console.log(result);
    }
    );
    res.json(values_db);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Erro ao realizar busca');
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
  getNota
  



};


