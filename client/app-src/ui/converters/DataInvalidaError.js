import { ApplicationError } from "../../util/ApplicationError.js";

export class DataInvalidaError extends ApplicationError {
  constructor() {
    super("A data deve estar no formato dia/mês/ano");
  }
}