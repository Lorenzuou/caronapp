db = require('../services/db.js');

const ShortUniqueId = require('short-unique-id');

let utils = require('../services/utils.js');







async function addGrupo(req, res) {
    var sql = "INSERT INTO GRUPO (nome,codigo) VALUES (?,?)";
    let uid = new ShortUniqueId({ length: 5 });
    let id = uid.randomUUID();
    let values = [req.body.nome, id];
    utils.insertDB(sql, values);
    res.json(id);
}

async function addGrupoUsuarioById(req, res) {
    var sql = "INSERT INTO GRUPO_USUARIO (grupo,usuario) VALUES (?,?)";
    let values = [req.body.grupo, req.body.usuario];
    utils.insertDB(sql, values).then(function (result) {
        res.json(result);
    });

}

async function addGrupoUsuarioByCodigo(req, res) {
    var sql = "SELECT id FROM GRUPO WHERE codigo = ?";
    let values = [req.body.codigo];
    let values_db = await utils.getQuery(sql, values);


    var sql2 = "INSERT INTO GRUPO_USUARIO (grupo_id,usuario_id) VALUES (?,?)";
    let values2 = [values_db[0].id, req.body.usuario];
    utils.insertDB(sql2, values2).then(function (result) {
        res.json(result);
    }
    );
}

async function getGrupos(req, res) {
    var sql = "SELECT * FROM GRUPO";
    let values = [];
    let values_db = await utils.getQuery(sql, values);


    res.json(values_db);
}

async function getGruposUsuario(req, res) {
    var sql = "SELECT * FROM GRUPO_USUARIO WHERE usuario_id = ?";
    let usuario =  await utils.getIdUsuarioToken(req);


    let values = [usuario];
    let values_db = await utils.getQuery(sql, values);

    if(values_db.error){
        return res.status(400).send({ "error": "Usuario nao encontrado" });
    }

    var sql2 = "SELECT * FROM GRUPO WHERE id = ?";
    let grupos = [];
    for (let i = 0; i < values_db.length; i++) {
        let values2 = [values_db[i].grupo_id];
        let grupo = await utils.getQuery(sql2, values2);
        grupos.push(grupo[0]);
    }


    res.json(grupos);
}


async function getGrupoById(req, res) {

    var sql = "SELECT * FROM GRUPO WHERE id = ?";
    let values = [req.params.grupo_id];
    let values_db = await utils.getQuery(sql, values);

    //get list of caronas from GRUPO_CARONA table
    var sql2 = "SELECT * FROM CARONA WHERE grupo = ?";

    let caronas = await utils.getQuery(sql2, values);
    if (caronas.error) {
        return res.status(400).send(caronas);
    } else {
        retorno = {
            grupo: values_db[0],
            caronas: caronas
        }
        res.json(retorno);
    }




}




//exports
module.exports = {
    addGrupo,
    getGrupos,
    getGrupoById,
    addGrupoUsuarioById,
    addGrupoUsuarioByCodigo,
    getGruposUsuario


}
