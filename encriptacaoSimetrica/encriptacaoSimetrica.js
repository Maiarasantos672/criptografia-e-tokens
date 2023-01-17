// A mensagem criptografada pode ser decriptografada quando a pessoa tem acesso à chave
// A chave precisa ser trafegada para quem vai decriptografar, correndo o risco de ser interceptada por um hacker

import {createCipheriv, randomBytes, createDecipheriv} from 'crypto'

const mensagem = 'Demonstração do curso'
const chave = randomBytes(32)
const vi = randomBytes(16)

const cifra = createCipheriv('aes256', chave, vi)

const mensagemCifrada = cifra.update(mensagem, 'utf-8', 'hex') + cifra.final('hex')

console.log('mensagemCifrada: ', mensagemCifrada);

// Transmissão ------------------------------------ chave, vi, mensagemCifrada

// Decifrar a mensagem

const decifra = createDecipheriv('aes256', chave, vi)

const mensagemDecifrada = decifra.update(mensagemCifrada, 'hex', 'utf-8') + decifra.final('utf-8')

console.log('mensagemDecifrada: ', mensagemDecifrada);