function CadastroModel(id, nome, profissao, contato) {
    this.id = id;
    this.nome = nome;
    this.prifissao = profissao;
    this.contato = contato;

    return {
        id: id,
        nome: nome,
        profissao: profissao,
        contato: contato,
    };
}

export default CadastroModel;