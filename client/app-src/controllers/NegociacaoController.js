import { Negociacao, NegociacaoService, Negociacoes } from "../domain/index.js";
import { DateConverter, MensagemView, Mensagem, NegociacoesView, DataInvalidaError } from "../ui/index.js";
import { DaoFactory, Bind, debounce, controller, bindEvent } from "../util/index.js";

@controller("#data", "#quantidade", "#valor")
export class NegociacaoController {

  constructor(_inputData, _inputQuantidade, _inputValor) {
    Object.assign(this, { _inputData, _inputQuantidade, _inputValor });
    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"),
      ["adiciona", "esvazia"]);
    this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"),
      ["texto"]);
    this._service = new NegociacaoService();
    this._dao = null;
    this.init();
  }

  async init() {
    const dao = await this.getDao();
    const negociacoes = await dao.listaTodos();
    negociacoes.sort((left, right) => right.data.getTime() - left.data.getTime());
    for (let negociacao of negociacoes) {
      this._negociacoes.adiciona(negociacao);
    }
  }

  async getDao() {
    if (this._dao) return this._dao;
    this._dao = await DaoFactory.getNegociacaoDao();
    return this._dao;
  }

  @bindEvent('submit', '.form')
  async adiciona(event) {
    try {
      event.preventDefault();
      const negociacao = this._criarNegociacao();
      const dao = await this.getDao();
      await dao.adiciona(negociacao);
      this._negociacoes.adiciona(negociacao);
      this._mensagem.texto = "Negociação adicionada com sucesso!";
      this._limpaFormulario();
    } catch (error) {
      console.log(error);
      console.log(error.stack);
      if (error instanceof DataInvalidaError) {
        this._mensagem.texto = error.message;
      } else {
        this._mensagem.texto = "Um erro inesperado aconteceu. Entre em contato com o suporte.";
      }
    }
  }

  // carrega os dados do formulário e cria um novo objeto Negociacao
  _criarNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value),
    );
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 0;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  @bindEvent('click', '#botao-apaga')
  async apaga() {
    try {
      const dao = await this.getDao();
      await dao.apagaTodos();
      this._negociacoes.esvazia();
      this._mensagem.texto = "Negociações apagadas com sucesso!";
    } catch (error) {
      this._mensagem.texto = "Não foi possível apagar negociações.";
    }
  }

  @bindEvent('click', '#botao-importa')
  @debounce(1000)
  async importarNegociacoes() {
    try {
      const negociacoes = (await this._service.obterNegociacoesDoPeriodo())
        .filter(negociacao => !this._negociacoes.paraArray()
          .some(item => item.equals(negociacao)));
      const dao = await this.getDao();
      for (let negociacao of negociacoes) {
        await dao.adiciona(negociacao);
        this._negociacoes.adiciona(negociacao);
      }
      this._mensagem.texto = "Negociações importadas com sucesso!";
    } catch (error) {
      this._mensagem.texto = error.message;
    }
  }

}