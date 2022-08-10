db = require('../services/db.js');

const { util } = require('config');
let utils = require('../services/utils.js');



async function addVeiculoUsuario(req, res) {

    //get usuario id from token
    let usuario_id = await utils.getIdUsuarioToken(req);
    if(usuario_id == null){
        res.status(400).send({ "error": "Usuário não encontrado" });
    } 


    //check if placa of veiculo already exists
    var sql = "SELECT * FROM VEICULO_USUARIO WHERE placa = ?";
    params = [req.body.placa];
    veiculo = await utils.getQuery(sql, params);
    if (veiculo.length > 0) {
       return  res.status(400).send({ "error": "Veiculo ja cadastrado" });
    } 

    var sql = "INSERT INTO VEICULO_USUARIO (veiculo,placa,ano,cor,renavam,usuario_id) VALUES (?, ?, ?, ?, ?, ?)";


    var values = [req.body.veiculo_id, req.body.placa, req.body.ano, req.body.cor, req.body.renavam, usuario_id];
    utils.insertDB(sql, values).then(function (result) {
        if (result.error) {
            res.status(400).send({ "error": "Erro ao cadastrar veiculo" });	

        } else {
            res.json(result);
        }
    });
}


async function getVeiculos(req, res) {
    //create request route for get all caronas
    var sql = "SELECT marca,nome,tipo,capacidade FROM VEICULO";

    

    veiculos = await utils.getQuery(sql, []);

    veiculos_lista = [];
    //for each veiculo turn foto into base64
    for (let i = 0; i < veiculos.length; i++) {
        //veiculos[i].foto = utils.getFoto(veiculos[i].foto);
        veiculos_lista.push(veiculos[i]);
    }
    if (veiculos_lista.length > 0) {
        res.json(veiculos_lista);
    } else {
        res.status(400).send({ "error": "Veiculos não encontrados" });
    };
}


async function getDocumentacaoVeiculo(req, res) {

    // api do detran para validadr a documentacao do condutor
    res.json({ "documentacao": true });

}


async function getVeiculo(req, res) {
    let sql = "SELECT * FROM VEICULO WHERE id = ?";
    let values = [req.params.veiculo_id];
    let veiculo = await utils.getQuery(sql, values);
    if (veiculo.length > 0) {
        res.json(veiculo[0]);
    } else {
        res.status(400).send({ "error": "Veiculo não encontrado" });
    }

}


async function getVeiculoCarona(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
    params = req.params.veiculo_id;
    veiculo = await utils.getQuery(sql, params);
    if (veiculo.length > 0) {
        res.json(veiculo[0]);
    } else {
        res.status(400).send({ "error": "Veiculo não encontrado" });
    };
}

async function getVeiculoUsuario(req, res) {

    let usuario = await utils.getIdUsuarioToken(req);
  if(usuario == null){
    res.status(400).send({ "error": "Usuario nao encontrado" });
  }

    //checking if usuario has the car on the database
    var sql = "SELECT * FROM VEICULO_USUARIO WHERE  usuario_id = ?";
    params = [ usuario];


    veiculo = await utils.getQuery(sql, params);

    if (veiculo.length > 0) {

        //get veiculo from veiculo table
        var sql = "SELECT * FROM VEICULO WHERE id = ?";
        params = [veiculo[0].veiculo];
        veiculo_origem = await utils.getQuery(sql, params);
        veiculo[0].foto = utils.getFoto(veiculo_origem[0].foto);
        veiculo[0].marca = veiculo_origem[0].marca;
        veiculo[0].modelo = veiculo_origem[0].modelo;
        console.log(veiculo[0]);
        res.json(veiculo[0]);
    } else {
        res.status(400).send({ "error": "Veiculo não encontrado" });
    };



};


async function deleteVeiculoUsuario(req, res) {
    //get usuario id from token
    let usuario = await utils.getIdUsuarioToken(req);
    if(usuario == null){
        res.status(400).send({ "error": "Usuario nao encontrado" });
    }
    
    var sql = "DELETE FROM VEICULO_USUARIO WHERE id = ? AND usuario_id = ?";
    
    
    //create request route for get all caronas
    params = [req.params.veiculo_id,usuario];

    utils.getQuery(sql, params).then(function (result) {
        if (result.error) {
            res.status(400).send({error: result.error});
        } else {
            res.json(result);
        }
    }).catch(function (err) {
        res.status(400).send({error: err});
    }); 

    
    
    
    
}

//exports

module.exports = {
    addVeiculoUsuario,
    getDocumentacaoVeiculo,
    getVeiculoCarona,
    getVeiculoUsuario,
    getVeiculo,
    getVeiculos,
    deleteVeiculoUsuario

}
