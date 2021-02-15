import { HttpService } from "../../util/HttpService.js";
import { Negociacao } from "./Negociacao.js";

export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  async obterNegociacoesDaSemana() {
    try {
      const response = await this._http.get("http://localhost:3000/negociacoes/semana");
      console.log(response);
      return response.map(objeto => new Negociacao(new Date(objeto.data),
        objeto.quantidade, objeto.valor));
    } catch (error) {
      throw new Error("Não foi possível obter negociações da semana.");
    }
  }

  async obterNegociacoesSemanaAnterior() {
    try {
      const response = await this._http.get("http://localhost:3000/negociacoes/anterior");
      return response.map(objeto => new Negociacao(new Date(objeto.data),
        objeto.quantidade, objeto.valor));
    } catch (error) {
      throw new Error("Não foi possível obter negociações da semana anterior.");
    }
  }

  async obterNegociacoesSemanaRetrasada() {
    try {
      const response = await this._http.get("http://localhost:3000/negociacoes/retrasada");
      return response.map(objeto => new Negociacao(new Date(objeto.data),
        objeto.quantidade, objeto.valor));
    } catch (error) {
      throw new Error("Não foi possível obter negociações da semana retrasada.");
    }
  }

  async obterNegociacoesDoPeriodo() {
    try {
      return (await Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesSemanaAnterior(),
        this.obterNegociacoesSemanaRetrasada()
      ])).reduce((novoArray, array) => novoArray.concat(array), [])
        .sort((left, right) => right.data.getTime() - left.data.getTime());
    } catch (error) {
      console.log(error);
      throw new Error("Não foi possível obter negociações do período");
    }
  }
}