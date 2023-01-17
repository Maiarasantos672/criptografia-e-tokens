// Qualquer pessoa pode criar um hash, mas ninguém consegue retornar ele para o valor original.
// Pode ser utilizado no lugar de armazemar uma senha de cliente diretamente no banco de dados.
// Muito fácil de ser pego no ataque rainbow table porque o hacker pode ter uma lista de hashes gerados pelas senhas mais padrões utilizadas e,
// caso consiga acessar o hash de um banco de dados, consegue comparar com a lista que possui e descobrir qual é a senha que o gerou.

import { createHash } from "crypto"

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex')
}

// console.log(criaHash('Uma escrita muito grande'))

class Usuario {
    constructor(nome, senha){
        this.nome = nome;
        this.hash = criaHash(senha)
    }

    autentica(nome, senha) {
        if (nome === this.nome && criaHash(senha) === this.hash) {
            console.log('Autenticado com sucesso')
            return true;
        }
        console.log('Usuário não autenticado')
        return false;
    }
}

const usuario = new Usuario('Maiara da Silva', 'minhaSenha')

// console.log(usuario)

// usuario.autentica('Maiara da Silva', 'minhaSenha')

// usuario.autentica('Maiara da Silv', 'minhaSenha')

usuario.autentica('Maiara da Silva', 'minhasenha')