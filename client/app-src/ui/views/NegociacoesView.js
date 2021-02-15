import { View } from "./View.js";
import { DateConverter } from "../converters/DateConverter.js";

export class NegociacoesView extends View {

  template(model) {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
      <tbody>
        ${model.paraArray().map((negociacao) => `
        <tr>
          <td>${DateConverter.paraTexto(negociacao.data)}</td>
          <td>${negociacao.quantidade}</td>
          <td>${negociacao.valor}</td>
          <td>${negociacao.volume.toFixed(2)}</td>
        </tr>
        `).join('')}
      </tbody>
      <tfoot>
        <td colspan="3"></td>
        <td>${model.volumeTotal.toFixed(2)}</td>
      </tfoot>
    </table>
    `;
  }
}