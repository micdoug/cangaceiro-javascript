System.register(['../../util/index.js'], function (_export, _context) {
  "use strict";

  var obrigatorio;
  return {
    setters: [function (_utilIndexJs) {
      obrigatorio = _utilIndexJs.obrigatorio;
    }],
    execute: function () {
      let Negociacao = class Negociacao {
        constructor(data = obrigatorio('data'), quantidade = obrigatorio('quantidade'), valor = obrigatorio('valor')) {

          this._data = new Date(data.getTime());
          this._quantidade = quantidade;
          this._valor = valor;
          Object.freeze(this);
        }

        get volume() {
          return this._quantidade * this._valor;
        }
        get quantidade() {
          return this._quantidade;
        }
        get valor() {
          return this._valor;
        }
        get data() {
          return new Date(this._data.getTime());
        }

        equals(negociacao) {
          return this.data.getDate() === negociacao.data.getDate() && this.data.getMonth() === negociacao.data.getMonth() && this.data.getFullYear() === negociacao.data.getFullYear() && this.quantidade === negociacao.quantidade && this.valor === negociacao.valor;
        }
      };

      _export('Negociacao', Negociacao);
    }
  };
});
//# sourceMappingURL=Negociacao.js.map