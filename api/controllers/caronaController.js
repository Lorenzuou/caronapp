
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



async function addVeiculoCarona(veiculo) {
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
    values = [req.body.origem, req.body.destino, req.body.data, req.body.espaco, req.body.valor, id_veiculo_carona, (req.body.grupo == null ? null : req.body.grupo), (req.body.obs == null ? null : req.body.obs), req.body.condutor];





    utils.insertDB(sql, values).then(function (result) {

        //insert condutor into the carona_usuario table
        sql = "INSERT INTO CARONA_USUARIO (carona_id,usuario_id) VALUES (?, ?)";
        values = [result.insertId, req.body.condutor];
        utils.insertDB(sql, values);
        res.json(result);

    });

}

async function reservarCarona(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO CARONA_USUARIO (carona_id,usuario_id) VALUES (?, ?)";
    var values = [req.body.carona_id, req.body.usuario_id];

    // update espaco in carona
    sql = "UPDATE CARONA SET espaco = espaco - 1 WHERE id = ?";
    values = [req.body.carona_id];
    utils.insertDB(sql, values);

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
    let sql = "SELECT * FROM CARONA WHERE grupo IS NULL AND origem = ? AND destino = ? AND datainicio = ? AND espaco > 1";
    params = [req.params.origem, req.params.destino, req.params.data];
    let caronas = await utils.getQuery(sql, params);
    let caronas_retorno = [];

    for (let i = 0; i < caronas.length; i++) {
        // get amount of users in carona
        sql = "SELECT COUNT(*) AS qtd FROM CARONA_USUARIO WHERE carona_id = ?";
        values = [caronas[i].id];
        var qtd = await utils.getQuery(sql, values);
        caronas[i].espaco = caronas[i].espaco - qtd[0].qtd;
    

        //get localizacao as a string
        sql = "SELECT * FROM LOCALIZACAO WHERE id = ?";
        caronas[i].origem_nome = await utils.getNomeLocal(caronas[i].origem);
        caronas[i].destino_nome = await utils.getNomeLocal(caronas[i].destino);


        //get condutor 
        sql = "SELECT * FROM USUARIO WHERE id = ?";
        values = [caronas[i].condutor];
        var condutor = await utils.getQuery(sql, values);
        console.log(condutor);
        condutor.foto = utils.getFoto(condutor[0].foto);
        caronas[i].condutor = condutor[0];

        //get veiculo from carona
        sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
        values = [caronas[i].veiculocarona];
        var veiculo = await utils.getQuery(sql, values);
        caronas[i].veiculo = veiculo[0];
        caronas_retorno.push(caronas[i]);
    }

    res.json(caronas_retorno);


}


async function getCaronasByUsuario(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA_USUARIO WHERE usuario_id = ?";
    var values = [req.params.usuario_id];
    utils.insertDB(sql, values).then(function (result) {
        if (result.error) {
            return res.status(400).send(result);
        } else {
            res.json(result);
        }
    });
}


async function getCaronasByGrupo(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE grupo = ?";
    var values = [req.params.id];
    utils.insertDB(sql, values).then(function (result) {
        if (result.error) {
            return res.status(400).send(result);
        } else {
            res.json(result);
        }
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
    var sql = "SELECT * FROM CARONA WHERE destino LIKE ?";
    params = req.params.id_destino;
    utils.insertDB(sql, params).then(function (result) {
        if (result.error) {
            return res.status(400).send(result);
        } else {
            res.json(result);
        }
    });
}

async function getCaronasOrigem(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE origem LIKE ?";
    params = req.params.id_origem;
    utils.insertDB(sql, params).then(function (result) {
        //if result.error is true then the carona is not found
        if (result.error) {
            return res.status(400).send(result);
        } else {
            res.json(result);
        }
    });
}

async function getCaronaById(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE id = ?";
    params = [req.body.carona_id];
    console.log(params);
    values_db = await utils.getQuery(sql, params);
    //if result.error is true then the carona is not found
    if (result.error) {
        return res.status(400).send({"error":"Carona não encontrada"});
    }
    console.log(values_db[0]);

    var sql = "SELECT id,foto,nome,nota,num_avaliacoes FROM USUARIO WHERE id IN (SELECT usuario_id FROM CARONA_USUARIO WHERE carona_id = ?);";

    values_db_2 = await utils.getQuery(sql, params);
    values_db[0].pessoas = values_db_2;

    


    //select VEICULO from carona_veiculo where id_carona = id_carona
    var sql = "SELECT * FROM VEICULO_CARONA WHERE id =?";
    params = [values_db[0].veiculocarona];
    console.log(params);
    values_db_3 = await utils.getQuery(sql, params);
    values_db[0].veiculo = values_db_3;


    res.json(values_db);


}




async function iniciarCarona(req, res) {
    carona = getCaronaById(req.body.id);
    carona.datainicio = new Date();
    // carona.status = "Iniciada";
    updateCarona(carona);

    res.json({ "status": "Carona iniciada" });
}

async function finalizarCarona(req, res) {


    datafim = new Date();
    //update datafim from CARONA TABLE WHERE id = req.body.id
    var sql = "UPDATE CARONA SET datafim = ? WHERE id = ?";
    values = [datafim, req.body.carona_id];
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.json(err);
    });


}


module.exports = {
    getCaronas,
    addCarona,
    deleteCarona,
    getCaronasDestino,
    getCaronasOrigem,
    getCaronaById,
    getCaronasByUsuario,
    getCaronasByGrupo,
    getDocumentacaoCondutorCarona,
    reservarCarona,
    iniciarCarona,
    finalizarCarona



};
