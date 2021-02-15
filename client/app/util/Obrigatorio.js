System.register(["./ApplicationError.js"], function (_export, _context) {
  "use strict";

  var ApplicationError;
  function obrigatorio(property) {
    throw new ApplicationError(`${property} é obrigatório`);
  }

  _export("obrigatorio", obrigatorio);

  return {
    setters: [function (_ApplicationErrorJs) {
      ApplicationError = _ApplicationErrorJs.ApplicationError;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=Obrigatorio.js.map