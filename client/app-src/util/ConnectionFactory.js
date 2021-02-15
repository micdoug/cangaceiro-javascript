let _connection = null;
let _close = null;

export class ConnectionFactory {

  constructor() {
    throw new Error("Você não deve criar instâncias dessa classe.");
  }

  static getConnection() {
    if (_connection) return _connection;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("jscangaceiro", 1);
      request.onupgradeneeded = e => {
        const connection = e.target.result;
        ConnectionFactory._createStores(connection);
      };
      request.onsuccess = e => {
        _connection = e.target.result;
        _close = _connection.close.bind(_connection);
        _connection.close = () => {
          throw new Error("Você não pode fechar a conexão diretamente. Use a ConnectionFactory.");
        };
        resolve(_connection);
      };
      request.onerror = e => {
        reject(e.target.error);
      };
    });
  }

  static _createStores(connection) {
    const stores = ["negociacoes"];
    for (let store of stores) {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }
      connection.createObjectStore(store, { autoIncrement: true });
    }
  }

  static closeConnection() {
    _close();
  }
}
