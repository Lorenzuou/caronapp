const jwt = require('jsonwebtoken');

exports.required = (req, res, next) => {
    console.log(req.body)
    try {
        
        const token = req.body.token
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    }

}

exports.optional = (req, res, next) => {

    try {
        const token = req.body.token;
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        next();
    }

}