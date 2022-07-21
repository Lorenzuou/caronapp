
db = require('./services/db.js');



function getQuery(sql, params) {
    try {
        let values_db = db.query(sql, params, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        return values_db;
    } catch (err) {
        console.log(err);
        return  res.json({'error': err});

    }
}

function insertDB(sql, params) {
    try {
        let values_db = db.query(sql, params, function (err, result) {
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

function getNomeLocal(local,cidade,estado){ 
    
    //query on table LOCALIZACAO to get the nome of the local
    let sql = "SELECT * FROM LOCALIZACAO WHERE id_local = ?";
    let local = getQuery(sql,local  );

    //query on table CIDADE to get the nome of the cidade
    sql = "SELECT * FROM CIDADE WHERE id_cidade = ?";
    
    let cidade = getQuery(sql,cidade  );

    //query on table ESTADO to get the nome of the estado
    sql = "SELECT * FROM ESTADO WHERE id_estado = ?";
    let estado = getQuery(sql,estado  );

    // concat all the nomes
    return local.nome + ", " + cidade.nome + ", " + estado.nome;
}


module.exports = {
    getNomeLocal,
    getQuery, 
    insertDB
    
}
