const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const config     = require('./config/config');

const url = config.bd_string;
// const url = 'mongodb+srv://admin:admin@cluster0.crioe.mongodb.net/testecurso?retryWrites=true&w=majority'
//const url = 'mongodb+srv://admin:<password>@cluster0.crioe.mongodb.net/<dbname>?retryWrites=true&w=majority'
// const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};
const options = { poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (erro) => {
    console.log('Erro na conexão com banco de dados: ' + err);
})
mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados');
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

/*
app.get('/', (req, res) => {
    let obj = req.query;
    
    return res.send({message: 'Tudo ok com o método GET! Você enviou o nome ${obj.nome} com idade de ${obj.idade} anos'});
    //return res.send({message: 'Tudo ok com o método GET! Você enviou o nome ${obj.nome} com idade de ${obj.idade} anos'});
    //return res.send({message: 'Tudo ok com o método GET!'});
})

app.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com método POST'});
})*/

app.listen(3000);

module.exports = app;