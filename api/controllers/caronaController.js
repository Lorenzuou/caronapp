

//create post route that adds a new carona to the database
async function addCarona(req, res) {
    //create request route for post a sign up
    var sql = "INSERT INTO CARONA (id_pessoa, id_carona, destino, origem, data, horario_saida, espaco, obs) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var values = [req.body.id_pessoa, req.body.id_carona, req.body.id_destino, req.body.id_origem, req.body.data, req.body.hora_carona, req.body.vagas, req.body.obs];
    // print the values to the console
    console.log(values);
    query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.send("1 record inserted");
}


async function deleteCarona(req, res) {
    //create request route for delete a carona
    var sql = "DELETE FROM carona WHERE id_carona = ?";
    var values = [req.body.id_carona];
    query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
    });
    res.send("1 record deleted");
}



async function getCaronas(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona";
    query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}



//get all caronas and then search for the carona with the id_destino substring 
async function getCaronasDestino(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE destino LIKE ?";
    var values = [req.body.id_destino];
    query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

async function getCaronasOrigem(req, res) {
    //create request route for get all caronas
    var sql = "SELECT * FROM carona WHERE origem LIKE ?";
    var values = [req.body.id_destino];
    query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}





//function for get carona by id
async function getCaronaById(req, res) {
    //create request route for get carona by id
    var sql = "SELECT * FROM carona WHERE id_carona = ?";
    var values = [req.params.id_carona];
    query(sql, values, function (err, result) {
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
