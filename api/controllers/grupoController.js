db = require('../services/db.js');

const ShortUniqueId = require('short-unique-id');

let utils = require('../services/utils.js');





async function addGrupo(req,res)
{ 
    var sql = "INSERT INTO GRUPO (nome,codigo) VALUES (?,?)";
    let uid = new ShortUniqueId({ length: 5 });
    let id = uid.randomUUID();
    let values = [ req.body.nome,id];
    utils.insertDB(sql, values);
    res.json(id);
}


async function getGrupos(req,res){ 
    var sql = "SELECT * FROM GRUPO";
    let values = [];
    let values_db = utils.getQuery(sql, values);
    res.json(values_db);
}

async function getGrupoById(req,res){
    var sql = "SELECT * FROM GRUPO WHERE id = ?";
    let values = [req.body.id];
    let values_db = utils.getQuery(sql, values);
    console.log(values_db);
    res.json(values_db);
}


//exports
module.exports = {
    addGrupo,
    getGrupos,
    getGrupoById

}
