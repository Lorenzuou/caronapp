
db = require('./db.js');



async function getQuery(sql, params) {
    try {
        console.log(params);
        console.log(sql)
        let values_db = await db.query(sql, params, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        return values_db;
    } catch (err) {
        console.log(err);
        return  {'error': err};

    }
}

async function insertDB(sql, params) {
    try {
        let values_db = await db.query(sql, params, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        }
        );
        return values_db;
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
}

function getNomeLocal(id_local,id_cidade,id_estado){ 
    
    //query on table LOCALIZACAO to get the nome of the local
    let sql = "SELECT * FROM LOCALIZACAO WHERE id_local = ?";
    let local = getQuery(sql,id_local  );

    //query on table CIDADE to get the nome of the cidade
    sql = "SELECT * FROM CIDADE WHERE id_cidade = ?";
    
    let cidade = getQuery(sql,id_cidade  );

    //query on table ESTADO to get the nome of the estado
    sql = "SELECT * FROM ESTADO WHERE id_estado = ?";
    let estado = getQuery(sql,id_estado  );

    // concat all the nomes
    return local.nome + ", " + cidade.nome + ", " + estado.nome;
}


module.exports = {
    getNomeLocal,
    getQuery, 
    insertDB
    
}
