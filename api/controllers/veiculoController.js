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


async function getVeiculos(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM VEICULO";
    
    veiculos = await utils.getQuery(sql, []);

    //for each veiculo turn foto into base64
    for(let i = 0; i < veiculos.length; i++){
        veiculos[i].foto = utils.getFoto(veiculos[i].foto);
    }
    if(veiculos.length > 0) {
        res.json(veiculos);
    } else {
        res.json({"error": "Veiculo não encontrado"});
    };
}


async function getDocumentacaoVeiculo(req, res) {
  
    // api do detran para validadr a documentacao do condutor
    res.json({"documentacao": true});

} 


async function getVeiculo(req, res) {
    let sql = "SELECT * FROM VEICULO WHERE id = ?";
    let values = [req.body.veiculo_id];
    let veiculo = await utils.getQuery(sql, values);
    if(veiculo.length > 0) {
        res.json(veiculo[0]);
    } else {
        res.json({"error": "Veiculo não encontrado"});
    }

} 


async function getVeiculoCarona(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
    params = req.body.veiculo_id;
    veiculo = await utils.getQuery(sql, params);
    if(veiculo.length > 0) {
        res.json(veiculo[0]);
    } else {
        res.json({"error": "Veiculo não encontrado"});
    };
}

async function getVeiculoUsuario(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM VEICULO_USUARIO WHERE id = ?";
    params = req.body.veiculo_id;
    values_db = await utils.getQuery(sql, params);
    if(veiculo.length > 0) {
        res.json(veiculo[0]);
    } else {
        res.json({"error": "Veiculo não encontrado"});
    };

}; 



//exports

module.exports = {
    addVeiculoUsuario,
    getDocumentacaoVeiculo, 
    getVeiculoCarona, 
    getVeiculoUsuario,
    getVeiculo,
    getVeiculos

}
