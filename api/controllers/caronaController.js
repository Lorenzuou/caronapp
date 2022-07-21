

//create post route that adds a new carona to the database
db = require('../services/db.js');
const { util } = require('config');
const { param } = require('../routes/routes.js');
let utilss = require('../services/utils.js');


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
            let values_db = utilss.getQuery(sql,params[i]);
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
        res.json({"documentacao": true});

    }



    async function getDocumentacaoVeiculo(req, res) {
        //create request route for get all caronas
        var sql = "SELECT * FROM carona WHERE veiculocarona = ?";
        params = req.params.id_veiculo;
        values_db = utilss.getQuery(sql, params);
        // api do detran para validadr a documentacao do condutor
        res.json({"documentacao": true});

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
        res.json(values_db);

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
        getDocumentacaoVeiculo,
        reservarCarona
        

    };
