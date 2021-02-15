import { NegociacaoDao } from "../domain/negociacao/NegociacaoDao.js";
import { ConnectionFactory } from "./ConnectionFactory.js";

export class DaoFactory {

  constructor() {
    throw new Error("Você não deve instanciar essa classe");
  }

  static async getNegociacaoDao() {
    let connection = await ConnectionFactory.getConnection();
    return new NegociacaoDao(connection);
  }
}