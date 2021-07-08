class NegotiationsService {
  constructor() {
    this._httpService = new HttpService();
  }

  getAllNegotiations() {
    return Promise.all([
      new Promise((resolve, reject) => {
        this._httpService
          .get("negociacoes/semana")
          .then((negotiations) => {
            resolve(
              negotiations.map(
                (negotiation) =>
                  new Negotiation(
                    new Date(negotiation.data),
                    negotiation.quantidade,
                    negotiation.valor
                  )
              )
            );
          })
          .catch((err) => {
            console.log(err);
            reject("Erro ao importar as negociações da semana");
          });
      }),

      new Promise((resolve, reject) => {
        this._httpService
          .get("negociacoes/anterior")
          .then((negotiations) => {
            resolve(
              negotiations.map(
                (negotiation) =>
                  new Negotiation(
                    new Date(negotiation.data),
                    negotiation.quantidade,
                    negotiation.valor
                  )
              )
            );
          })
          .catch((err) => {
            console.log(err);
            reject("Erro ao importar as negociações da semana passada");
          });
      }),

      new Promise((resolve, reject) => {
        this._httpService
          .get("negociacoes/retrasada")
          .then((negotiations) => {
            resolve(
              negotiations.map(
                (negotiation) =>
                  new Negotiation(
                    new Date(negotiation.data),
                    negotiation.quantidade,
                    negotiation.valor
                  )
              )
            );
          })
          .catch((err) => {
            console.log(err);
            reject("Erro ao importar as negociações da semana retrasada");
          });
      }),
    ]);
  }

  add(negotiation) {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDao(connection))
      .then((dao) => dao.add(negotiation))
      .then(() => "Negociação adicionada com sucesso")
      .catch(() => {
        throw new Error("Não foi possível adicionar a negociação");
      });
  }

  listAll() {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDao(connection))
      .then((dao) => dao.listNegotiations())
      .catch(() => {
        throw new Error("Não foi possível listar as negociações");
      });
  }

  delete() {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDao(connection))
      .then((dao) => dao.deleteAllNegotiations())
      .catch(() => {
        throw new Error("Não foi possível apagar as negociações")
      });
  }

  import(list) {
    return this.getAllNegotiations()
    .then((negotiations) =>
      negotiations.filter(
        (negotiations) =>
          !list.some(
            (existsNegotiation) =>
              JSON.stringify(existsNegotiation) ==
              JSON.stringify(negotiations)
          )
      )
    )
    .catch(() => "Não foi possível importar as negociações");
  }
}
