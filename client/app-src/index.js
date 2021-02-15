const campos = [
  document.querySelector("#data"),
  document.querySelector("#valor"),
  document.querySelector("#quantidade")
];

// precisamos da tag tbody, porque vamos inserir dados na tabela
const tbody = document.querySelector("table tbody");

// cria uma nova linha na tabela quando o formulário é submetido
document.querySelector("form").addEventListener("submit", (event) => {
  // cancela a submissão do formulário para evitar recarregamento da tela
  event.preventDefault();

  const tr = document.createElement("tr");

  campos.forEach((campo) => {
    const td = document.createElement("td");
    td.textContent = campo.value;
    tr.appendChild(td);
  });

  const tdVolume = document.createElement("td");
  tdVolume.textContent = campos[1].value * campos[2].value;
  tr.appendChild(tdVolume);
  tbody.appendChild(tr);

  // limpa o campo de data
  campos[0].value = "";
  // limpa o campo de quantidade
  campos[1].value = 0;
  // limpa o campo de valor
  campos[2].value = 0.0;

  campos[0].focus();
});