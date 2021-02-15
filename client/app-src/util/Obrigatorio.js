import { ApplicationError } from "./ApplicationError.js";

export function obrigatorio(property) {
  throw new ApplicationError(`${property} é obrigatório`);
}