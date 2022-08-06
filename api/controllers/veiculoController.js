db = require('../services/db.js');

let utils = require('../services/utils.js');



async function addVeiculoUsuario(req, res) {
    

    var sql = "INSERT INTO VEICULO_USUARIO (veiculo,placa,ano,cor,renavam,usuario_id) VALUES (?, ?, ?, ?, ?, ?)";
    
    var values = [req.body.veiculo_id,req.body.placa, req.body.ano, req.body.cor, req.body.renavam, req.body.usuario_id];
    console.log(values);
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    });
}





async function getDocumentacaoVeiculo(req, res) {
  
    // api do detran para validadr a documentacao do condutor
    res.json({"documentacao": true});

} 

async function getVeiculoCarona(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
    params = req.params.id_veiculo;
    values_db = await utils.getQuery(sql, params);
    res.json(values_db);
}

async function getVeiculoUsuario(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM VEICULO_USUARIO WHERE id = ?";
    params = req.params.id_veiculo;
    values_db = await utils.getQuery(sql, params);
    // api do detran para validadr a documentacao do condutor
    res.json(values_db);
}; 



//exports

module.exports = {
    addVeiculoUsuario,
    getDocumentacaoVeiculo, 
    getVeiculoCarona, 
    getVeiculoUsuario

}
