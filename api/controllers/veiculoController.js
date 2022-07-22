db = require('../services/db.js');

let utils = require('../services/utils.js');



async function addVeiculoCarona(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO VEICULO_CARONA (modelo,placa,ano,marca,cor,renavam) VALUES (?, ?, ?, ?, ?, ?)";
    var values = [req.body.modelo, req.body.placa, req.body.ano, req.body.marca, req.body.cor, req.body.renavam];
    utilss.insertDB(sql, values);
} 

async function addVeiculoUsuario(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO VEICULO_USUARIO (modelo,placa,ano,marca,cor,renavam,usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var values = [req.body.modelo, req.body.placa, req.body.ano, req.body.marca, req.body.cor, req.body.renavam, req.body.usuario_id];
    utilss.insertDB(sql, values);
}



async function getDocumentacaoVeiculo(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE veiculocarona = ?";
    params = req.params.id_veiculo;
    values_db = utilss.getQuery(sql, params);
    // api do detran para validadr a documentacao do condutor
    res.json({"documentacao": true});

} 


//exports

module.exports = {
    addVeiculoCarona,
    addVeiculoUsuario,
    getDocumentacaoVeiculo
}
