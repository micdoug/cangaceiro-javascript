System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let ProxyFactory = class ProxyFactory {

        static _ehFuncao(target) {
          return typeof target === typeof Function;
        }

        static create(target, props, armadilha) {
          return new Proxy(target, {
            get: (target, prop, receiver) => {
              if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
                return function () {
                  const returnValue = target[prop].apply(target, arguments);
                  armadilha();
                  return returnValue;
                };
              }
              return Reflect.get(target, prop, receiver);
            },
            set: (target, prop, value, receiver) => {
              const updated = Reflect.set(target, prop, value, receiver);
              if (props.includes(prop)) {
                armadilha();
              }
              return updated;
            }
          });
        }
      };

      _export("ProxyFactory", ProxyFactory);
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map