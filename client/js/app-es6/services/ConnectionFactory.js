var ConnectionFactory = (function () {
  const stores = ["negotiations"];
  const version = 3;
  const dbName = "aluraframe";

  var connection = null;
  var closeConnection = null;

  return class ConnectionFactory {
    constructor() {
      throw new Error("class is not instanciable");
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = (event) => {
          ConnectionFactory._createStores(event.target.result);
        };

        openRequest.onsuccess = (event) => {
          if (!connection) {
            connection = event.target.result;
            //salvando a referência antes de sobrescrever a função close utilizando bind para manter o contexto global connection
            closeConnection = connection.close.bind(connection);
            //sobrescrevendo a função close da connection por uma nova função para impedir o fechamento da conexão pelo desenvolvedor
            connection.close = function () {
              throw new Error("Você não pode fechar a conexão");
            };
          }
          resolve(connection);
        };

        openRequest.onerror = (event) => {
          console.log(event.target.error);
          reject(event.target.error.name);
        };
      });
    }

    static _createStores(connection) {
      stores.forEach((store) => {
        if (connection.objectStoreNames.contains(store)) {
          connection.deleteObjectStore(store);
        }

        connection.createObjectStore(store, {
          autoIncrement: true,
        });
      });
    }

    static closeConnection() {
      if (connection) {
        closeConnection();
        connection = null;
      }
    }
  };
})();
