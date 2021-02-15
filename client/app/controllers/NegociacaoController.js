System.register(["../domain/index.js", "../ui/index.js", "../util/index.js"], function (_export, _context) {
  "use strict";

  var Negociacao, NegociacaoService, Negociacoes, DateConverter, MensagemView, Mensagem, NegociacoesView, DataInvalidaError, DaoFactory, Bind, debounce, controller, bindEvent;
  return {
    setters: [function (_domainIndexJs) {
      Negociacao = _domainIndexJs.Negociacao;
      NegociacaoService = _domainIndexJs.NegociacaoService;
      Negociacoes = _domainIndexJs.Negociacoes;
    }, function (_uiIndexJs) {
      DateConverter = _uiIndexJs.DateConverter;
      MensagemView = _uiIndexJs.MensagemView;
      Mensagem = _uiIndexJs.Mensagem;
      NegociacoesView = _uiIndexJs.NegociacoesView;
      DataInvalidaError = _uiIndexJs.DataInvalidaError;
    }, function (_utilIndexJs) {
      DaoFactory = _utilIndexJs.DaoFactory;
      Bind = _utilIndexJs.Bind;
      debounce = _utilIndexJs.debounce;
      controller = _utilIndexJs.controller;
      bindEvent = _utilIndexJs.bindEvent;
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

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
          Object['define' + 'Property'](target, property, desc);
          desc = null;
        }

        return desc;
      }

      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2;

      let NegociacaoController = (_dec = controller("#data", "#quantidade", "#valor"), _dec2 = bindEvent('submit', '.form'), _dec3 = bindEvent('click', '#botao-apaga'), _dec4 = bindEvent('click', '#botao-importa'), _dec5 = debounce(1000), _dec(_class = (_class2 = class NegociacaoController {

        constructor(_inputData, _inputQuantidade, _inputValor) {
          Object.assign(this, { _inputData, _inputQuantidade, _inputValor });
          this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), ["adiciona", "esvazia"]);
          this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), ["texto"]);
          this._service = new NegociacaoService();
          this._dao = null;
          this.init();
        }

        init() {
          var _this = this;

          return _asyncToGenerator(function* () {
            const dao = yield _this.getDao();
            const negociacoes = yield dao.listaTodos();
            negociacoes.sort(function (left, right) {
              return right.data.getTime() - left.data.getTime();
            });
            for (let negociacao of negociacoes) {
              _this._negociacoes.adiciona(negociacao);
            }
          })();
        }

        getDao() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (_this2._dao) return _this2._dao;
            _this2._dao = yield DaoFactory.getNegociacaoDao();
            return _this2._dao;
          })();
        }

        adiciona(event) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            try {
              event.preventDefault();
              const negociacao = _this3._criarNegociacao();
              const dao = yield _this3.getDao();
              yield dao.adiciona(negociacao);
              _this3._negociacoes.adiciona(negociacao);
              _this3._mensagem.texto = "Negociação adicionada com sucesso!";
              _this3._limpaFormulario();
            } catch (error) {
              console.log(error);
              console.log(error.stack);
              if (error instanceof DataInvalidaError) {
                _this3._mensagem.texto = error.message;
              } else {
                _this3._mensagem.texto = "Um erro inesperado aconteceu. Entre em contato com o suporte.";
              }
            }
          })();
        }

        // carrega os dados do formulário e cria um novo objeto Negociacao
        _criarNegociacao() {
          return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }

        _limpaFormulario() {
          this._inputData.value = "";
          this._inputQuantidade.value = 0;
          this._inputValor.value = 0.0;
          this._inputData.focus();
        }

        apaga() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield _this4.getDao();
              yield dao.apagaTodos();
              _this4._negociacoes.esvazia();
              _this4._mensagem.texto = "Negociações apagadas com sucesso!";
            } catch (error) {
              _this4._mensagem.texto = "Não foi possível apagar negociações.";
            }
          })();
        }

        importarNegociacoes() {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            try {
              const negociacoes = (yield _this5._service.obterNegociacoesDoPeriodo()).filter(function (negociacao) {
                return !_this5._negociacoes.paraArray().some(function (item) {
                  return item.equals(negociacao);
                });
              });
              const dao = yield _this5.getDao();
              for (let negociacao of negociacoes) {
                yield dao.adiciona(negociacao);
                _this5._negociacoes.adiciona(negociacao);
              }
              _this5._mensagem.texto = "Negociações importadas com sucesso!";
            } catch (error) {
              _this5._mensagem.texto = error.message;
            }
          })();
        }

      }, (_applyDecoratedDescriptor(_class2.prototype, "adiciona", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "adiciona"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "apaga", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "apaga"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "importarNegociacoes", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "importarNegociacoes"), _class2.prototype)), _class2)) || _class);

      _export("NegociacaoController", NegociacaoController);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map