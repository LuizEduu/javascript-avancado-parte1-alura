class Aluno {
  constructor(matricula, nome) {
    this.matricula = matricula;
    this.nome = nome;
  }
}

class Prova {
  constructor(aluno, nota) {
    this.aluno = aluno;
    this.nota = nota;
  }
}

let avaliacoes = [
  new Prova(new Aluno(1, "Luiz"), 8),
  new Prova(new Aluno(2, "José"), 4),
  new Prova(new Aluno(3, "Marcos"), 7),
  new Prova(new Aluno(4, "Maria"), 6),
];

console.log(
  avaliacoes.filter((prova) => prova.nota >= 7).map((prova) => prova.aluno.nome)
);
