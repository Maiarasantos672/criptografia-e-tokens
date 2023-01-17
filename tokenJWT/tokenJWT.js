import jwt from 'jsonwebtoken';

const chaveSecreta = 'chaverSuperSecreta';

const token = jwt.sign(
    {
        apelino: 'jm',
        curso: 'segurança e node.js'
    }, chaveSecreta
)
console.log('token: ', token);

const tokenDecodificado = jwt.verify(token, chaveSecreta);
console.log('tokenDecodificado: ', tokenDecodificado);