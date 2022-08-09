
db = require('./db.js');



function getFoto(foto){ 
    // convert foto to base64
    if(foto != null){
        let base64 = Buffer.from(foto).toString('base64');
        return base64;
    }else{
        return null;
    }
   
}

async function getQuery(sql, params) {
    try {
      
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
        return  {'error': err};
    }
}

async function getNomeLocal(id_local){ 
    
    //query on table LOCALIZACAO to get the nome of the local
    let sql = "SELECT * FROM LOCALIZACAO WHERE id = ?";
    let local = await getQuery(sql,[id_local]  );
    

    //query on table CIDADE to get the nome of the cidade
    sql = "SELECT * FROM CIDADE WHERE id = ?";
    
    let cidade = await getQuery(sql,[local[0].cidade] );

    //query on table ESTADO to get the nome of the estado
    sql = "SELECT * FROM ESTADO WHERE id = ?";
    let estado =  await getQuery(sql,[cidade[0].uf]  );

    return local[0].local + ", " + cidade[0].nome + ", " + estado[0].nome;
}


module.exports = {
    getNomeLocal,
    getQuery, 
    insertDB, 
    getFoto
    
}
