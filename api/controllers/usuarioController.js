
db = require('../services/db.js');



const passport = require('passport');







// create login function
async function login(req, res) {

  const express = require('express');


  router.post('/',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login?fail=true'
    })
  );

}







async function singup(req, res) {
  //create request route for post a sign up

  //handle error

  try {
    var sql = "INSERT INTO PESSOA (nome, email, senha, sexo) VALUES (?, ?, ?, ?)";
    var values = [req.body.nome, req.body.senha, req.body.email, req.body.sexo];
    db.query(sql, values, function (err, result) {
      if (err) throw err;
      else res.json({ 'message': 'Usuário cadastrado com sucesso!' });
    }
    );
    res.send('Usuário cadastrado com sucesso!');
  } catch (err) {
    console.log(err);
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


