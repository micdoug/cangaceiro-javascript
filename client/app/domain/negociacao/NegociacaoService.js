System.register(["../../util/HttpService.js", "./Negociacao.js"], function (_export, _context) {
  "use strict";

  var HttpService, Negociacao;
  return {
    setters: [function (_utilHttpServiceJs) {
      HttpService = _utilHttpServiceJs.HttpService;
    }, function (_NegociacaoJs) {
      Negociacao = _NegociacaoJs.Negociacao;
    }],
    execute: function () {
      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }

            return step("next");
          });
        };
      }

      let NegociacaoService = class NegociacaoService {

        constructor() {
          this._http = new HttpService();
        }

        obterNegociacoesDaSemana() {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              const response = yield _this._http.get("negociacoes/semana");
              console.log(response);
              return response.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            } catch (error) {
              throw new Error("Não foi possível obter negociações da semana.");
            }
          })();
        }

        obterNegociacoesSemanaAnterior() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            try {
              const response = yield _this2._http.get("negociacoes/anterior");
              return response.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            } catch (error) {
              throw new Error("Não foi possível obter negociações da semana anterior.");
            }
          })();
        }

        obterNegociacoesSemanaRetrasada() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            try {
              const response = yield _this3._http.get("negociacoes/retrasada");
              return response.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            } catch (error) {
              throw new Error("Não foi possível obter negociações da semana retrasada.");
            }
          })();
        }

        obterNegociacoesDoPeriodo() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            try {
              return (yield Promise.all([_this4.obterNegociacoesDaSemana(), _this4.obterNegociacoesSemanaAnterior(), _this4.obterNegociacoesSemanaRetrasada()])).reduce(function (novoArray, array) {
                return novoArray.concat(array);
              }, []).sort(function (left, right) {
                return right.data.getTime() - left.data.getTime();
              });
            } catch (error) {
              console.log(error);
              throw new Error("Não foi possível obter negociações do período");
            }
          })();
        }
      };

      _export("NegociacaoService", NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map