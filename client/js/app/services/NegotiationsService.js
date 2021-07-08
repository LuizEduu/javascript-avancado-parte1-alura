class NegotiationsService {
  constructor() {
    this._httpService = new HttpService();
  }

  getNegotiationsWeek() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "negociacoes/semana");

      // funcão vai ser chamada toda vez que o estado do xhr mudar
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(
            JSON.parse(xhr.responseText).map(
              (negotiation) =>
                new Negotiation(
                  new Date(negotiation.data),
                  negotiation.quantidade,
                  negotiation.valor
                )
            )
          );
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          console.log(xhr.responseText);
          reject("Não foi possível importar as negociações");
        }
      };

      xhr.send();
    });
  }

  getNegotiationsLastWeek() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", "negociacoes/anterior");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(
            JSON.parse(xhr.responseText).map(
              (negotiation) =>
                new Negotiation(
                  new Date(negotiation.data),
                  negotiation.quantidade,
                  negotiation.valor
                )
            )
          );
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          reject("Não foi possível obter as negociações da semana retrasada");
        }
      };

      xhr.send();
    });
  }

  getNegotiationsDelayedWeek() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "negociacoes/retrasada");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(
            JSON.parse(xhr.responseText).map(
              (negotiation) =>
                new Negotiation(
                  new Date(negotiation.data),
                  negotiation.quantidade,
                  negotiation.valor
                )
            )
          );
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          reject("Não foi possível obter as negociações da semana retrasada");
        }
      };

      xhr.send();
    });
  }

  getAllNegotiations() {
    return Promise.all([
      this.getNegotiationsWeek(),
      this.getNegotiationsLastWeek(),
      this.getNegotiationsDelayedWeek(),
    ])
      .then()
      .catch((err) => err);
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
        throw new Error("Não foi possível apagar as negociações");
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
