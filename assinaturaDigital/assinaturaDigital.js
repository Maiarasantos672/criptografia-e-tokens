// O documento é assinado e é enviado o documento, a assinatura e uma chave pública para quem vai ler a informação.
// Com a chave publica, o leitor consegue transformar a assinatura em um documento. 
// Basta comparar o documento que foi gerado a partir da assinatura com o documento que foi recebido. Sabendo se este documento é da pessoa que diz ter enviado ou não.
// Aqui é a chave privada que gera a assinatura e a chave pública que valida a assinatura.

import { generateKeyPairSync, createSign, createVerify} from 'crypto'

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

let dados = 'Essa string vai ser assinada!'

// Assinatura

const assinador = createSign('RSA-SHA256')

assinador.update(dados)

const assinatura = assinador.sign(privateKey, 'hex')
console.log('assinatura: ', assinatura);

// Intermediário (hacker)

dados += ' Arquivo alterado' // Alteração antes de ser validado, faz com que a assinatura não seja validada

// Envio do documento ------- Documento, assinatura e chave pública

const verificador = createVerify('RSA-SHA256')

verificador.update(dados)

const ehVerificado = verificador.verify(publicKey, assinatura, 'hex')
console.log('ehVerificado: ', ehVerificado);
