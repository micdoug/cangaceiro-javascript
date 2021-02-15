import { View } from "./View.js";

export class MensagemView extends View {

  template(model) {
    if (model.texto === "") {
      return "";
    }
    return `<p class="alert alert-info">${model.texto}</p>`;
  }
}