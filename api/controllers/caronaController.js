
//request veiculo controller 
const veiculoController = require('./veiculoController');
//create post route that adds a new carona to the database
const db = require('../services/db.js');

let utils = require('../services/utils.js');



//essa funcao deve ser chamada quando o usuario finaliza a carona

async function updateCarona(values) {
    //create request route for update a carona
    let sql = "UPDATE CARONA SET origem = ?, destino = ?, data = ?, hora = ?, espaco = ?, valor = ?, veiculocarona = ? WHERE id = ?";
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    });
}



async function addVeiculoCarona( veiculo) {
    //create request route for post a sign up
    console.log(veiculo);
    var sql = "INSERT INTO VEICULO_CARONA (veiculo,ano,cor,placa,renavam) VALUES (?, ?, ?, ?, ?)";
    var values = [veiculo.veiculo, veiculo.ano, veiculo.cor, veiculo.placa, veiculo.renavam];
    result = await utils.insertDB(sql, values);
    return result.insertId;
       
   
}


async function addCarona(req, res) {

    //select the veiculo with the id of the veiculo from VEICULO_CARONA
    let sql = "SELECT * FROM VEICULO_USUARIO WHERE id = ?";
    let values = [req.body.veiculo];
    let veiculo = await utils.getQuery(sql, values);
    let id_veiculo_carona = await addVeiculoCarona(veiculo[0]);
    console.log(id_veiculo_carona)
    //if grupo == null

    sql = "INSERT INTO CARONA (origem,destino,datainicio,espaco,valor,veiculocarona,grupo,obs,condutor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    values = [req.body.origem, req.body.destino, req.body.data, req.body.espaco, req.body.valor, id_veiculo_carona, (req.body.grupo == null ? null : req.body.grupo)  ,  (req.body.obs == null ?  null : req.body.obs), req.body.condutor];
    


    // // values = [veiculo.ano, veiculo.cor, veiculo.placa, veiculo.renavam];
    console.log(values);

    utils.insertDB(sql, values).then(function (result) {
        res.json(result);

    });

}

async function reservarCarona(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO CARONA_USUARIO (carona_id,usuario_id) VALUES (?, ?)";
    var values = [req.body.carona, req.body.usuario];
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    });
}





async function deleteCarona(req, res) {
    //create request route for delete a carona
    var sql = "DELETE FROM carona WHERE id = ?";
    var values = [req.body.id];
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
    });
    res.send("1 record deleted");
}



async function getCaronas(req, res) {


    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE grupo = NULL AND origem = ? AND destino = ?";
    params = [req.params.id_origem, req.params.id_destino];


    //for each value in values_db, get the nome local of the origem and destino
    for (let i = 0; i < values_db.length; i++) {
        let values_db = utils.getQuery(sql, params[i]);
        values_db[i].origem = utils.getNomeLocal(values_db[i].origem);
        values_db[i].destino = utils.getNomeLocal(values_db[i].destino);
    }
    res.json(values_db);

    return res.json(values_db);

}


async function getCaronaByUsuario(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA_USUARIO WHERE usuario_id = ?";
    var values = [req.params.id];
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    });
}


async function getCaronaByGrupo(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE grupo = ?";
    var values = [req.params.id];
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    });

}

async function getDocumentacaoCondutorCarona(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE condutor = ?";
    params = req.params.id_condutor;
    values_db = utils.getQuery(sql, params);
    // api do detran para validadr a documentacao do condutor
    res.json({ "documentacao": true });

}



//get all caronas and then search for the carona with the id_destino substring 
async function getCaronasDestino(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE destino LIKE ?";
    params = req.params.id_destino;
    utils.insertDB(sql, params).then(function (result) {
        res.json(result);
    });
}

async function getCaronasOrigem(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE origem LIKE ?";
    params = req.params.id_origem;
    utils.insertDB(sql, params).then(function (result) {
        res.json(result);
    });
}

async function getCaronaById(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE id = ?";
    params = [req.body.id];
    values_db = await utils.getQuery(sql, params);

    console.log(values_db[0]);

    var sql = "SELECT id,foto,nome,nota,num_avaliacoes FROM USUARIO WHERE id IN (SELECT id FROM CARONA_USUARIO WHERE carona_id = ?)";

    values_db_2 = await utils.getQuery(sql, params);
    values_db[0].pessoas = values_db_2;

    // for each value in values_db, comsole.log the usuario
    for (let i = 0; i < values_db.length; i++) {
        console.log(values_db[i].pessoas);
    }



    //select VEICULO from carona_veiculo where id_carona = id_carona
    var sql = "SELECT * FROM VEICULO_CARONA WHERE id IN (SELECT id_veiculo FROM VEICULO_CARONA WHERE id_carona = ?)";
    values_db_3 = utils.getQuery(sql, params);
    values_db[0].veiculos = values_db_3;

    // //select VEICULO from carona_veiculo where id_carona = id_carona
    // var sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
    // values_db_3 = utils.getQuery(sql, params);
    // values_db[0].veiculos = values_db_3;

    // //select PESSOA from carona_usuario where condutor = condutor]
    // var sql = "SELECT * FROM PESSOA WHERE id_pessoa IN (SELECT id_pessoa FROM carona WHERE condutor = ?)";
    // values_db_4 = utils.getQuery(sql, params);
    // values_db[0].condutor = values_db_4;

    res.json(values_db);


}




async function iniciarCarona(req, res) {
    carona = getCaronaById(req.body.id);
    carona.datainicio = new Date();
    carona.status = "Iniciada";
    updateCarona(carona);

    res.json({ "status": "Carona iniciada" });
}

async function finalizarCarona(req, res) {
    carona = getCaronaById(req.params.id_carona);
    carona.datafim = new Date();
    carona.status = "Finalizada";
    updateCarona(carona);

    res.json({ "status": "Carona finalizada" });

}


module.exports = {
    getCaronas,
    addCarona,
    deleteCarona,
    getCaronasDestino,
    getCaronasOrigem,
    getCaronaById,
    getCaronaByUsuario,
    getCaronaByGrupo,
    getDocumentacaoCondutorCarona,
    reservarCarona,
    iniciarCarona,
    finalizarCarona



};
