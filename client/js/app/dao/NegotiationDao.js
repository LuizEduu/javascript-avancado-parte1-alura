class NegotiationDao {
  constructor(connection) {
    this._connection = connection;
    this._store = "negotiations";
  }

  add(negotiation) {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], "readwrite")
        .objectStore(this._store)
        .add(negotiation);

      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        console.log(event.target.error);
        reject("Não foi possível adicionar a negociação");
      };
    });
  }

  listNegotiations() {
    return new Promise((resolve, reject) => {
      const cursor = this._connection
        .transaction([this._store], "readonly")
        .objectStore(this._store)
        .openCursor();

      const negotiations = [];

      cursor.onsuccess = (event) => {
        let pointer = event.target.result;

        if (pointer) {
          const data = pointer.value;

          negotiations.push(
            new Negotiation(new Date(data._data), data._quantity, data._value)
          );

          pointer.continue();
        } else {
          resolve(negotiations);
        }
      };

      cursor.onerror = (event) => {
        console.log(event.target.error);
        reject("Não foi possível listar as negociações");
      };
    });
  }

  deleteAllNegotiations() {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], "readwrite")
        .objectStore(this._store)
        .clear();

      request.onsuccess = (event) =>
        resolve("Negociações removidas com sucesso");
      request.onerror = (event) => {
        console.log(event.target.error);
        reject("Não foi possível apagar as negociações");
      };
    });
  }
}
