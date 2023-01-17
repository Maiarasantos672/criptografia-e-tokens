// A mensagem criptografada pode ser decriptografada quando a pessoa tem acesso à chave privada
// A chave privada não é compartilhada
// A chave publica é compartilhada (quem vai receber a informação manda uma chave publica para quem quer enviar a informação)
// Não tem problema caso a chave publica seja interceptada, pois ela apenas criptografa, não tem o poder de decriptografar
// Cada um que for receber informações precisará gerar sua chave publica e privada e compartilhar a publica com quem for enviar informações para ele

import { generateKeyPairSync } from 'crypto'

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding:  {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
})

// Transmissão da chave pública ppara quem deseja enviar uma mensagem

import { publicEncrypt, privateDecrypt } from 'crypto'

const dadosCriptografados = publicEncrypt(
    publicKey,
    Buffer.from('Mensagem super secreta')
)
console.log('dadosCriptografados: ', dadosCriptografados.toString('hex'));

// Tranmissão da mensagem para quem havia gerado as chaves inicialmente

const dadosDecifrados = privateDecrypt(
    privateKey,
    dadosCriptografados
)


console.log('dadosDecifrados: ', dadosDecifrados.toString('utf-8'));