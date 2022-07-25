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
    
    //get list of caronas from GRUPO_CARONA table
    var sql2 = "SELECT * FROM GRUPO_CARONA WHERE id_grupo = ?";
    let values2 = [req.body.id];
    let values_db2 = utils.getQuery(sql2, values2);

    //for each id_carona, select id,data,valor,origem,destino,vagas
    var sql3 = "SELECT * FROM CARONA WHERE id = ?";
    let values3 = [];
    let caronas = [];
    for (e of values_db2) {
        values3.push(e.id_carona);
        let carona = utils.getQuery(sql3, values3);
        values_db3.push(carona);
        // get condutor from CARONA table 
        var sql4 = "SELECT foto,nome,nota FROM PESSOA WHERE id = ?";
        let values4 = [carona[0].id_condutor];
        let condutor = utils.getQuery(sql4, values4);
        
        carona[0].condutor = condutor[0];

        caronas.push(carona[0]);


    }
   
        
    retorno = {
        grupo: values_db[0],
        caronas: caronas
    }


    console.log(retorno);
    res.json(retorno);
}




//exports
module.exports = {
    addGrupo,
    getGrupos,
    getGrupoById

}
