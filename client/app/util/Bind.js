System.register(["./ProxyFactory.js"], function (_export, _context) {
  "use strict";

  var ProxyFactory;
  return {
    setters: [function (_ProxyFactoryJs) {
      ProxyFactory = _ProxyFactoryJs.ProxyFactory;
    }],
    execute: function () {
      let Bind = class Bind {
        constructor(model, view, observableProperties) {
          const proxy = ProxyFactory.create(model, observableProperties, () => view.update(model));
          view.update(model);
          // returning from a constructor??? WTF
          return proxy;
        }
      };

      _export("Bind", Bind);
    }
  };
});
//# sourceMappingURL=Bind.js.map