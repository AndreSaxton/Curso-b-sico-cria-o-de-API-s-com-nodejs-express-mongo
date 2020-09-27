const jwt    = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({ error: 'Token não enviado!'});
    // if(!token_header) return res.send({ error: 'Token não enviado!'});
    

    // jwt.verify(token_header, 'batatafrita2019', (err, decoded) => {
    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido!'});
        // if(err) return res.send({ error: 'Token inválido!'});
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;