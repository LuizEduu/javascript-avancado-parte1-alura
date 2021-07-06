class NegotiationsService {
  getNegotiationsWeek(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "negociacoes/semana");

    // funcão vai ser chamada toda vez que o estado do xhr mudar
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(
          null,
          JSON.parse(xhr.responseText).map(
            (negotiation) =>
              new Negotiation(
                new Date(negotiation.data),
                negotiation.quantidade,
                negotiation.valor
              )
          )
        );
      } else if (xhr.readyState == 4 && xhr.status == 400) {
        console.log(xhr.responseText);
        callback("Não foi possível importar as negociações");
      }
    };

    xhr.send();
  }
}
