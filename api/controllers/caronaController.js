

//create post route that adds a new carona to the database
db = require('../services/db.js');

async function addCarona(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO CARONA (espaco, horario_saida, data, origem, destino, obs) VALUES (?, ?, ?, ?, ?, ?)";
    //TODO: 1. padronizar o formato da data para horario saida e data da carona
        
    var values = [req.body.espaco, req.body.horario_saida, req.body.data, req.body.origem, req.body.destino, req.body.obs];
    // print the values to the console
    console.log(values);
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.send("1 record inserted");
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



//get all caronas and then search for the carona with the id_destino substring 
async function getCaronasDestino(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE destino LIKE ?";
    var values = [req.body.id_destino];
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

async function getCaronasOrigem(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE origem LIKE ?";
    var values = [req.body.id_destino];
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}





//function for get carona by id
async function getCaronaById(req, res) {
    //create request route for get carona by id
    var sql = "SELECT * FROM carona WHERE id_carona = ?";
    var values = [req.params.id_carona];
    db.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
    });

}

module.exports = {
    getCaronas,
    addCarona,
    deleteCarona,
    getCaronasDestino,
    getCaronasOrigem,
    getCaronaById,  
};
