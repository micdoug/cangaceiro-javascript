System.register(["../../util/ApplicationError.js"], function (_export, _context) {
  "use strict";

  var ApplicationError;
  return {
    setters: [function (_utilApplicationErrorJs) {
      ApplicationError = _utilApplicationErrorJs.ApplicationError;
    }],
    execute: function () {
      let DataInvalidaError = class DataInvalidaError extends ApplicationError {
        constructor() {
          super("A data deve estar no formato dia/mês/ano");
        }
      };

      _export("DataInvalidaError", DataInvalidaError);
    }
  };
});
//# sourceMappingURL=DataInvalidaError.js.map