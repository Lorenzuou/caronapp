

//create post route that adds a new carona to the database
db = require('../services/db.js');

async function addCarona(req, res) {
    //create request route for post a sign up
    const moment = require('moment');

    var sql = "INSERT INTO CARONA (espaco, horario_saida, data, origem, destino, obs,valor,id_pessoa) VALUES (?, ?, ?, ?,?, ?, ?,?)";
    //TODO: 1. padronizar o formato da data para horario saida e data da carona
    
    var values = [req.body.espaco, req.body.horario, req.body.data_saida, req.body.origem, req.body.destino, req.body.obs,req.body.valor,req.body.id_pessoa];
    console.log(values)
    try {
        db.query(sql, values, function (err, result) {
            if (err) throw  res.status(500).send('Erro ao cadastrar carona'); 
                console.log("1 record inserted");
        });
        res.send("1 record inserted");
    }catch(err){
        console.log(err);
        return res.status(500).send('Erro do servidor');
    }
    
    

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
    var sql = "SELECT * FROM carona";

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}



function getQuery(sql) {
    try {
        var values = [req.body.value];
        let values_db = db.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.json(values_db);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro do servidor');
    }
}

//get all caronas and then search for the carona with the id_destino substring 
async function getCaronasDestino(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE destino LIKE ?";
    getQuery(sql);
}

async function getCaronasOrigem(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE origem LIKE ?";
    getQuery(sql);
} 

async function getCaronaById(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE id_carona = ?";
    getQuery(sql);
}

        
module.exports = {
    getCaronas,
    addCarona,
    deleteCarona,
    getCaronasDestino,
    getCaronasOrigem,
    getCaronaById,
    
};
