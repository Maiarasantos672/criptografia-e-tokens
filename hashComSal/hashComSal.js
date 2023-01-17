// Qualquer pessoa pode criar um hash, mas ninguém consegue retornar ele para o valor original.
// Pode ser utilizado no lugar de armazemar uma senha de cliente diretamente no banco de dados.
// Mai dificil de ser pego no ataque rainbow table

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function criaHashComSal(senha) {
  const sal = randomBytes(16).toString("hex");
  const senhaHasheada = scryptSync(senha, sal, 64).toString("hex");

  return `${sal}:${senhaHasheada}`;
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    [this.sal, this.hash] = criaHashComSal(senha).split(":");
  }

  autentica(nome, senha) {
    if (nome === this.nome) {
      const hashTeste = scryptSync(senha, this.sal, 64);
      const hashReal = Buffer.from(this.hash, "hex");

      const hashesCorrespondem = timingSafeEqual(hashTeste, hashReal);

      if (hashesCorrespondem) {
        console.log("Usuário autenticado com sucesso!");
        return true;
      }
      console.log("Usuário ou senha inválida!");
      return false;
    }
  }
}

const mai = new Usuario("Maiara da Silva Santos", "senhaSecreta");

console.log(mai);

console.log(mai.autentica("Maiara da Silva Santos", "senhaSecreta"));
// console.log(mai.autentica('Maiara da Silva Santos', 'senhasecreta'))
