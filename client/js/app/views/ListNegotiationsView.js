class ListNegotiationsView {
  constructor(elementHTML) {
    this.elementHTML = elementHTML;
  }

  _template(model) {
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
      ${model.negotiations
        .map(
          (negotiation) =>
            `
            <td>${DateHelper.convertDateToString(negotiation.data)}</td>
            <td>${negotiation.quantity}</td>
            <td>${negotiation.value}</td>
            <td>${negotiation.volume}</td>
          `
        )
        .join("")}
    </tbody>

    <tfoot></tfoot>
  </table>
    `;
  }

  update(model) {
    return (this.elementHTML.innerHTML = this._template(model));
  }
}
