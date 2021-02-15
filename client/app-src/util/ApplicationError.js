export class ApplicationError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ApplicationError";
  }
}