const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://admin:admin@cluster0.crioe.mongodb.net/testecurso?retryWrites=true&w=majority',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }
        case 'html':
            return{
                bd_string: 'mongodb+srv://admin:admin@cluster0.crioe.mongodb.net/testecurso?retryWrites=true&w=majority',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }
        case 'prod':
            return{
                bd_string: 'mongodb+srv://admin:admin@cluster0.crioe.mongodb.net/testecurso?retryWrites=true&w=majority',
                jwt_pass: 'SENHA_FALSA_trvbyyunimvmsomdoisi',
                jwt_expires_in: '7d'
            }
    }
}

console.log('Iniciando a API em ambiente ${env.toUpperCase()}');

module.exports = config();