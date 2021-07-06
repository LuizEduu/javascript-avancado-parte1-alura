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
}
