const button = document.querySelector("#submitButton");

function calculateVolume(value, quantity) {
  return Number(value) * Number(quantity);
}

function appendTds(inputs, tr) {
  inputs.forEach((input) => {
    const td = document.createElement("td");
    td.textContent = input.value;
    tr.appendChild(td);
  });

  const tdVolume = document.createElement("td");
  tdVolume.textContent = inputs[2].value * inputs[1].value;
  tr.appendChild(tdVolume);
}

function getInputValues() {
  const inputs = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor"),
  ];

  return inputs;
}

function clearInputs(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  const tbody = document.querySelector("tbody");
  const tr = document.createElement("tr");
  const negotiation = getInputValues();

  appendTds(negotiation, tr);

  tbody.appendChild(tr);
  clearInputs(negotiation);
  negotiation[0].focus()
});
