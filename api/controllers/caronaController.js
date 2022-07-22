

//create post route that adds a new carona to the database
db = require('../services/db.js');

let utilss = require('../services/utils.js');





async function updateCarona(values) {
    //create request route for update a carona
    let sql = "UPDATE CARONA SET origem = ?, destino = ?, data = ?, hora = ?, vagas = ?, valor = ?, veiculocarona = ? WHERE id = ?";
    values_db = utilss.insertDB(sql, values);
}


async function addCarona(req, res) {
    //create request route for post a sign up


    //TODO: 1. padronizar o formato da data para horario saida e data da carona
    if (req.body.grupo == null) {
        var sql = "INSERT INTO CARONA (espaco,datainicio, origem, destino, obs,valor,condutor,veiculocarona) VALUES (?, ?, ?, ?,?, ?, ?,?,?)";
        var values = [req.body.espaco, req.body.datainicio, req.body.origem, req.body.destino, req.body.obs, req.body.valor, req.body.condutor];
    } else {
        var sql = "INSERT INTO CARONA (espaco,datainicio, origem, destino, obs,valor,condutor,grupo,veiculocarona) VALUES (?, ?, ?, ?,?, ?, ?,?,?)";
        var values = [req.body.espaco, req.body.datainicio, req.body.origem, req.body.destino, req.body.obs, req.body.valor, req.body.condutor, req.body.grupo];

    }
    console.log(values)
    utilss.insertDB(sql, values);

}

async function reservarCarona(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO CARONA_USUARIO (idcarona,idusuario) VALUES (?, ?)";
    var values = [req.body.id_carona, req.body.id_usuario];
    utilss.insertDB(sql, values);
}





async function deleteCarona(req, res) {
    //create request route for delete a carona
    var sql = "DELETE FROM carona WHERE id_carona = ?";
    var values = [req.body.id_carona];
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
        let values_db = utilss.getQuery(sql, params[i]);
        values_db[i].origem = utilss.getNomeLocal(values_db[i].origem);
        values_db[i].destino = utilss.getNomeLocal(values_db[i].destino);
    }
    res.json(values_db);

    return res.json(values_db);

}


async function getCaronaByUsuario(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA_USUARIO WHERE usuario_id = ?";
    var values = [req.params.id];
    values_db = utilss.getQuery(sql, values);
    res.json(values_db);
}


async function getCaronaByGrupo(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE grupo = ?";
    var values = [req.params.id];
    values_db = utilss.getQuery(sql, values);
    res.json(values_db);

}

async function getDocumentacaoCondutorCarona(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE condutor = ?";
    params = req.params.id_condutor;
    values_db = utilss.getQuery(sql, params);
    // api do detran para validadr a documentacao do condutor
    res.json({ "documentacao": true });

}



//get all caronas and then search for the carona with the id_destino substring 
async function getCaronasDestino(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE destino LIKE ?";
    params = req.params.id_destino;
    values_db = utilss.getQuery(sql, params);
    res.json(values_db);
}

async function getCaronasOrigem(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE origem LIKE ?";
    params = req.params.id_origem;
    values_db = utilss.getQuery(sql, params);
    res.json(values_db);

}

async function getCaronaById(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE id_carona = ?";
    params = req.params.id_carona;
    values_db = utilss.getQuery(sql, params);

    //select PESSOA from carona_usuario where id_carona = id_carona
    var sql = "SELECT * FROM PESSOA WHERE id_pessoa IN (SELECT id_pessoa FROM carona_usuario WHERE id_carona = ?)";

    values_db_2 = utilss.getQuery(sql, params);
    values_db[0].pessoas = values_db_2;

    //select VEICULO from carona_veiculo where id_carona = id_carona
    var sql = "SELECT * FROM VEICULO WHERE id_veiculo IN (SELECT id_veiculo FROM carona_veiculo WHERE id_carona = ?)";
    values_db_3 = utilss.getQuery(sql, params);
    values_db[0].veiculos = values_db_3;

    //select PESSOA from carona_usuario where condutor = condutor]
    var sql = "SELECT * FROM PESSOA WHERE id_pessoa IN (SELECT id_pessoa FROM carona WHERE condutor = ?)";
    values_db_4 = utilss.getQuery(sql, params);
    values_db[0].condutor = values_db_4;


    res.json(values_db);

}




async function iniciarCarona(req, res) {
    carona = getCaronaById(req.params.id_carona);
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
