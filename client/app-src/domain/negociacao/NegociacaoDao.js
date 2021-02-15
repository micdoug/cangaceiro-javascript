import { Negociacao } from './Negociacao.js';

export class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction("negociacoes", "readwrite")
        .objectStore("negociacoes")
        .add(negociacao);

      request.onsuccess = e => resolve();
      request.onerror = e => reject(e.target.error);
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction("negociacoes", "readonly")
        .objectStore("negociacoes")
        .openCursor();

      const negociacoes = [];
      request.onsuccess = e => {
        const atual = e.target.result;
        if (atual) {
          negociacoes.push(new Negociacao(atual.value._data, atual.value._quantidade,
            atual.value._valor));
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      };
      request.onerror = e => reject(e.target.error);
    });
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction("negociacoes", "readwrite")
        .objectStore("negociacoes")
        .clear();

      request.onsuccess = e => resolve();
      request.onerror = e => reject(e.target.error);
    });
  }
}