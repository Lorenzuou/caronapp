
//create post route that adds a new carona to the database
const { util } = require('config');
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


async function getLocalizacao(req, res) {
    var sql = "SELECT * FROM LOCALIZACAO WHERE local LIKE ?";


    if (req.params.local != null) {

        local = req.params.local.toUpperCase();
        local = "%" + local + "%";
        let values = await utils.getQuery(sql, [local]);

        if (values.length > 0) {
            local_lista = [];

            for (let i = 0; i < values.length; i++) {
                local = await utils.getObjetoLocal(values[i].id);
                local_lista.push(local);
            }
            res.json(local_lista);
        } else {
            res.json([]);
        }


    } else {
        res.json([]);
    }





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

    //get usuario id from token 
    let usuario_id = await utils.getIdUsuarioToken(req);

    //select the veiculo with the id of the veiculo from VEICULO_CARONA
    let sql = "SELECT * FROM VEICULO_USUARIO WHERE id = ?";
    let values = [req.body.veiculo];
    let veiculo = await utils.getQuery(sql, values);
    let id_veiculo_carona = await addVeiculoCarona(veiculo[0]);

    //if grupo == null

    sql = "INSERT INTO CARONA (origem,destino,data,espaco,valor,veiculocarona,grupo,obs,condutor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    values = [req.body.origem, req.body.destino, req.body.data, req.body.espaco, req.body.valor, id_veiculo_carona, (req.body.grupo == null ? null : req.body.grupo), (req.body.obs == null ? null : req.body.obs), usuario_id];





    utils.insertDB(sql, values).then(function (result) {
        if (result.error) {
            return res.status(400).send({ error: "erro ao inserir carona  " });
        } else {
            //insert condutor into the carona_usuario table
            sql = "INSERT INTO CARONA_USUARIO (carona_id,usuario_id) VALUES (?, ?)";

            values = [result.insertId, usuario_id];
            utils.insertDB(sql, values);
            res.json(result);
        }

    });

}

async function reservarCarona(req, res) {
    //create request route for post a sign up
    let usuario = await utils.getIdUsuarioToken(req);
    console.log(usuario);
    var sql = "INSERT INTO CARONA_USUARIO (carona_id,usuario_id) VALUES (?, ?)";
    var values = [req.params.carona_id, usuario];
    utils.insertDB(sql, values).then(function (result) {
        if (result.error) {
            return res.status(400).send({ error: "erro ao reservar carona  " });
        }
        return res.json(result);

    });


    // // update espaco in carona
    // sql = "UPDATE CARONA SET espaco = espaco - 1 WHERE id = ?";
    // values = [req.params.carona_id];

    // utils.insertDB(sql, values).then(function (result) {
    //     if (result.error) {
    //         return res.status(400).send({ error: "erro ao reservar carona  " });
    //     } else {

    //         res.json(result);
    //     }
    // });

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
    //set date from req.body.data
    let data_end = new Date(req.body.data);


    //create an equivalent data with time in 23:59:59
    data_end.setHours(23, 59, 59);

    let usuario = await utils.getIdUsuarioToken(req);
    //create request route for get all caronas
    let sql = "SELECT * FROM CARONA WHERE grupo IS NULL AND origem = ? AND destino = ? AND data >= ? AND data <= ?   AND condutor != ?";
    params = [req.body.origem, req.body.destino, req.body.data, data_end, usuario];
    let caronas = await utils.getQuery(sql, params);
    let caronas_retorno = [];



    for (let i = 0; i < caronas.length; i++) {
        // get amount of users in carona
        sql = "SELECT COUNT(*) AS qtd FROM CARONA_USUARIO WHERE carona_id = ?";
        values = [caronas[i].id];
        var qtd = await utils.getQuery(sql, values);

        console.log(caronas[i].espaco - qtd[0].qtd);
        if (caronas[i].espaco - qtd[0].qtd > 0) {
            caronas[i].espaco = caronas[i].espaco - qtd[0].qtd;
            //check if usuario is in carona 
            sql = "SELECT * FROM CARONA_USUARIO WHERE carona_id = ? AND usuario_id = ?";
            values = [caronas[i].id, usuario];
            var usuario_carona = await utils.getIdUsuarioToken(req);
            if (usuario_carona.length > 0)
                break;

            //get localizacao as a string
            sql = "SELECT * FROM LOCALIZACAO WHERE id = ?";
            caronas[i].origem = await utils.getObjetoLocal(caronas[i].origem);
            caronas[i].destino = await utils.getObjetoLocal(caronas[i].destino);


            //get condutor 
            sql = "SELECT nome FROM USUARIO WHERE id = ?";
            values = [caronas[i].condutor];
            var condutor = await utils.getQuery(sql, values);

            //SELECT FROM VEICULO WHERE ID = VEICULO_CARONA 
            sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
            values = [caronas[i].veiculocarona];
            var veiculo = await utils.getQuery(sql, values);
            caronas[i].veiculo = veiculo[0];
            //get veiculo nome
            sql = "SELECT nome,marca FROM VEICULO WHERE id = ?";
            values = [caronas[i].veiculo.veiculo];
            var veiculo_nome = await utils.getQuery(sql, values);
            let nome_veiculo = veiculo_nome[0].nome + " " + veiculo_nome[0].marca;


            caronas[i].condutor = { "nome": condutor[0].nome, "veiculo": nome_veiculo, "foto": utils.getFoto(condutor[0].foto) };


            caronas_retorno.push(caronas[i]);
        }
    }

    res.json(caronas_retorno);


}


async function getCaronasByUsuario(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA_USUARIO WHERE usuario_id = ?";
    var usuario = await utils.getIdUsuarioToken(req);
    utils.insertDB(sql, [usuario]).then(async function (result) {
        if (result.error) {
            return res.status(400).send(result);
        } else {

            //for each carona_id, get carona
            let caronas = [];
            console.log(result);
            for (let i = 0; i < result.length; i++) {

          
                sql = "SELECT * FROM CARONA WHERE id = ?";
                values = [result[i].carona_id];
                let carona = await utils.getQuery(sql, values);



                //get localizacao as a string
                sql = "SELECT * FROM LOCALIZACAO WHERE id = ?";
                carona[0].origem = await utils.getObjetoLocal(carona[0].origem);
                carona[0].destino = await utils.getObjetoLocal(carona[0].destino);
                //get condutor
                sql = "SELECT * FROM USUARIO WHERE id = ?";
                values = [carona[0].condutor];
                var condutor = await utils.getQuery(sql, values);

                //SELECT FROM VEICULO WHERE ID = VEICULO_CARONA
                sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
                values = [carona[0].veiculocarona];
                var veiculo = await utils.getQuery(sql, values);
                carona[0].veiculo = veiculo[0];
                //get veiculo nome
                sql = "SELECT nome,marca FROM VEICULO WHERE id = ?";
                values = [carona[0].veiculo.veiculo];
                var veiculo_nome = await utils.getQuery(sql, values);
                let nome_veiculo = veiculo_nome[0].nome + " " + veiculo_nome[0].marca;

                console.log({ "nome": condutor[0].nome, "veiculo": nome_veiculo, "foto": utils.getFoto(condutor[0].foto) })

                carona[0].condutor = { "nome": condutor[0].nome, "veiculo": nome_veiculo, "foto": utils.getFoto(condutor[0].foto) };


                caronas.push(carona[0]);


            }

            res.json(caronas);
        }
    });
}


async function getCaronasByGrupo(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM CARONA WHERE grupo = ?";
    var values = [req.params.grupo_id];

    let caronas = await utils.getQuery(sql, values);
    let caronas_retorno = [];

    let usuario = await utils.getIdUsuarioToken(req);


    for (let i = 0; i < caronas.length; i++) {
        // get amount of users in carona
        sql = "SELECT COUNT(*) AS qtd FROM CARONA_USUARIO WHERE carona_id = ?";
        values = [caronas[i].id];
        var qtd = await utils.getQuery(sql, values);

        console.log(caronas[i].espaco - qtd[0].qtd);
        if (caronas[i].espaco - qtd[0].qtd > 0) {
            caronas[i].espaco = caronas[i].espaco - qtd[0].qtd;
            //check if usuario is in carona 
            sql = "SELECT * FROM CARONA_USUARIO WHERE carona_id = ? AND usuario_id = ?";
            values = [caronas[i].id, usuario];
           //check if usuario is in carona 
           sql = "SELECT * FROM CARONA_USUARIO WHERE carona_id = ? AND usuario_id = ?";
           values = [caronas[i].id, usuario];
           var usuario_carona = await utils.getQuery(sql, values);
           if (usuario_carona.length > 0)
               break;
            //get localizacao as a string
            sql = "SELECT * FROM LOCALIZACAO WHERE id = ?";
            caronas[i].origem = await utils.getObjetoLocal(caronas[i].origem);
            caronas[i].destino = await utils.getObjetoLocal(caronas[i].destino);


            //get condutor 
            sql = "SELECT nome FROM USUARIO WHERE id = ?";
            values = [caronas[i].condutor];
            var condutor = await utils.getQuery(sql, values);

            //SELECT FROM VEICULO WHERE ID = VEICULO_CARONA 
            sql = "SELECT * FROM VEICULO_CARONA WHERE id = ?";
            values = [caronas[i].veiculocarona];
            var veiculo = await utils.getQuery(sql, values);
            caronas[i].veiculo = veiculo[0];
            //get veiculo nome
            sql = "SELECT nome,marca FROM VEICULO WHERE id = ?";
            values = [caronas[i].veiculo.veiculo];
            var veiculo_nome = await utils.getQuery(sql, values);
            let nome_veiculo = veiculo_nome[0].nome + " " + veiculo_nome[0].marca;


            caronas[i].condutor = { "nome": condutor[0].nome, "veiculo": nome_veiculo, "foto": utils.getFoto(condutor[0].foto) };


            caronas_retorno.push(caronas[i]);
        }
    }
    res.json(caronas_retorno);


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

    let usuario = utils.getIdUsuarioToken(req);
    if (usuario == null) {
        return res.status(400).send({ error: true, message: "Usuário não encontrado" });
    }

    var sql = "SELECT * FROM CARONA WHERE id = ?";
    params = [req.params.carona_id];
    console.log(params);
    values_db = await utils.getQuery(sql, params);
    //if result.error is true then the carona is not found
    if (result.error) {
        return res.status(400).send({ "error": "Carona não encontrada" });
    }

    var sql = "SELECT id,foto,nome,nota,num_avaliacoes FROM USUARIO WHERE id IN (SELECT usuario_id FROM CARONA_USUARIO WHERE carona_id = ? AND usuario_id != ?);";

    params = [values_db[0].id, values_db[0].condutor];

    values_db_2 = await utils.getQuery(sql, params);

    for (let i = 0; i < values_db_2.length; i++) {
        if (values_db_2[i].foto != null) {
            values_db_2[i].foto = utils.getFoto(values_db_2[i].foto);
        }
    }

    values_db[0].pessoas = values_db_2;




    //select VEICULO from carona_veiculo where id_carona = id_carona
    var sql = "SELECT * FROM VEICULO_CARONA WHERE id =?";
    params = [values_db[0].veiculocarona];
    console.log(params);
    veiculo_carona = await utils.getQuery(sql, params);

    //get veiculo from VEICULO where id == veiculo_carona.veiculo
    var sql = "SELECT nome,marca,foto FROM VEICULO WHERE id = ?";
    params = [veiculo_carona[0].veiculo];
    veiculo = await utils.getQuery(sql, params);


    values_db[0].veiculo = veiculo;



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
        res.status(400).send(err);
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
    finalizarCarona,
    getLocalizacao



};
