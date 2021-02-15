System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let ApplicationError = class ApplicationError extends Error {
        constructor(mensagem) {
          super(mensagem);
          this.name = "ApplicationError";
        }
      };

      _export("ApplicationError", ApplicationError);
    }
  };
});
//# sourceMappingURL=ApplicationError.js.map