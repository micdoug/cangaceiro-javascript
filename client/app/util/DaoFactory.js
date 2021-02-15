System.register(["../domain/negociacao/NegociacaoDao.js", "./ConnectionFactory.js"], function (_export, _context) {
  "use strict";

  var NegociacaoDao, ConnectionFactory;
  return {
    setters: [function (_domainNegociacaoNegociacaoDaoJs) {
      NegociacaoDao = _domainNegociacaoNegociacaoDaoJs.NegociacaoDao;
    }, function (_ConnectionFactoryJs) {
      ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
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

      let DaoFactory = class DaoFactory {

        constructor() {
          throw new Error("Você não deve instanciar essa classe");
        }

        static getNegociacaoDao() {
          return _asyncToGenerator(function* () {
            let connection = yield ConnectionFactory.getConnection();
            return new NegociacaoDao(connection);
          })();
        }
      };

      _export("DaoFactory", DaoFactory);
    }
  };
});
//# sourceMappingURL=DaoFactory.js.map