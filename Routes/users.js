const express = require('express');
const router  = express.Router();
const Users   = require('../model/users');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const config  = require('../config/config');

//FUNCOES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({id: userId}, config.jwt_pass, { expiresIn: config.jwt_expires_in});
    // return jwt.sign({id: userId}, 'batatafrita2019', { expiresIn: '7d'});
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuarios!'});
        // return res.send({ error: 'Erro na consulta de usuarios!'});
    }
});

router.post('/create', async (req, res) =>{
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).send({ error: 'Dados Insuficientes!'});

    try {
        if(await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        
        return res.status(201).send({user, token: createUserToken(user.id)});
        //return res.send(user);

    } catch (err) {
        if(err) return res.status(500).send({ error: 'Erro ao buscar usuario!'});
    }
});

router.post('/auth', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({ error: "Dados Insuficientes!"});

    try {
        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.status(400).send({error: 'Usuario não registrado!'+user});

        const pass_ok = await bcrypt.compare(password, user.password);
        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário"'});
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
        // return res.send(user);
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuario!'});
    }
});

/*
router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if(err) return res.send({ error: 'Erro na consulta de usuarios!'});
        return res.send(data);
    });
    // return res.send({message: 'Tudo ok com o metodo GET da rota de usuarios'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o metodo POST da rota de usuarios'});
});

router.post('/create', (req, res) => {
    // const obj = req.body;
    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: 'Dados Insuficientes!'});
    // if(!obj.email || !obj.password) return res.send({ error: 'Dados Insuficientes!'});

    Users.findOne({email}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao buscar usuario!'});
        if(data) return res.send({ error: 'Usuario ja cadastrado!'});

        Users.create(req.body, (err, data) => {
            if(err) return res.send({ error: 'Erro ao criar usuario'});

            data.password = undefined;
            return res.send(data);
        });
        // Users.create({email: email, password: password});
    });
    // Users.findOne({email: email});

    // return res.send({message: 'Seu usuario foi criado =)'});
})

router.post('/auth', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.send({ error: "Dados Insuficientes!"});

    Users.findOne({email}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao buscar usuario!'});
        if(!data) return res.send({error: 'Usuario não registrada!'});

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({ error: 'Erro ao autenticar usuário"'});

            data.password = undefined;
            return res.send(data);
        })
    }).select('+password');
});
*/

module.exports = router;

/*
200 - OK
201 - CREATED
202 - ACCEPTED

400 - BAD REQUEST
401 - UNAUTHORIZED -- AUTENTICAÇÃO, tem caráter temporário.
403 - FORBIDDEN    -- AUTORIZAÇÃO , tem caráter permanente.
404 - NOT FOUND

500 - INTERNAL SERVER ERROR
501 - NOT IMPLEMENTED       - A API não suporta essa funcionalidade
503 - SERVICE UNAVAILABLE   - A APIP executa essa operação, mas no momento está indiponivel
*/