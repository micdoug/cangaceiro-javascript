System.register(["./DataInvalidaError.js"], function (_export, _context) {
  "use strict";

  var DataInvalidaError;
  return {
    setters: [function (_DataInvalidaErrorJs) {
      DataInvalidaError = _DataInvalidaErrorJs.DataInvalidaError;
    }],
    execute: function () {
      let DateConverter = class DateConverter {

        constructor() {
          throw new Error("Esta classe não deve ser instanciada.");
        }

        static paraTexto(data) {
          const formatter = new Intl.DateTimeFormat("pt-BR");
          return formatter.format(data);
        }

        static paraData(dataTexto) {
          if (!/^\d{2}\/\d{2}\/\d{4}/.test(dataTexto)) {
            throw new DataInvalidaError();
          }

          return new Date(...dataTexto.split("/").reverse().map((item, index) => index === 1 ? item - 1 : item));
        }
      };

      _export("DateConverter", DateConverter);
    }
  };
});
//# sourceMappingURL=DateConverter.js.map