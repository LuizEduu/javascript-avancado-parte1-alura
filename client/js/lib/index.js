const button = document.querySelector("#submitButton");

function calculateVolume(value, quantity) {
  return Number(value) * Number(quantity);
}

function createTd(value) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

function getInputValues() {
  const data = document.querySelector("#data").value;
  const quantity = document.querySelector("#quantidade").value;
  const value = document.querySelector("#valor").value;

  return {
    data,
    quantity,
    value,
    volume: calculateVolume(value, quantity),
  };
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  const tbody = document.querySelector("tbody");

  const negotiation = getInputValues();

  const tr = document.createElement("tr");
  tr.appendChild(createTd(negotiation.data));
  tr.appendChild(createTd(negotiation.quantity));
  tr.appendChild(createTd(negotiation.value));
  tr.appendChild(createTd(negotiation.volume));

  tbody.appendChild(tr);
});
