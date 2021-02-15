import { DataInvalidaError } from "./DataInvalidaError.js";

export class DateConverter {

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
}
