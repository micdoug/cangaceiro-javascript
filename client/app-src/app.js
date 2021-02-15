import { NegociacaoController } from "./controllers/NegociacaoController.js";
import { Negociacao } from "./domain/index.js";

const controller = new NegociacaoController();

// document.querySelector("form")
//   .addEventListener("submit", controller.adiciona.bind(controller));
// document.querySelector("#botao-apaga")
//   .addEventListener("click", controller.apaga.bind(controller));
// document.querySelector("#botao-importa")
//   .addEventListener("click", controller.importarNegociacoes.bind(controller));

const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set("Content-Type", "application/json");
const config = {
  method: "POST",
  headers: headers,
  body: JSON.stringify(negociacao),
};

fetch("/negociacoes", config)
  .then(resp => {
    if (resp.ok) {
      console.log("deu certo");
    } else {
      console.log(resp.statusText);
    }
  });