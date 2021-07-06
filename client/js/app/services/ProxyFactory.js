class ProxyFactory {
  static create(object, props, action) {
    return new Proxy(object, {
      
      get(target, prop, reciever) {
        if (
          props.includes(prop) &&
          typeof target[prop] == typeof Function //verifica se é uma function
        ) {
          return function () {
            //se for retorna uma nova function aplicando as traps
            console.log(target[prop]); //busca pela função add no alvo que é o listNegotiations
            Reflect.apply(target[prop], target, arguments); //aplica a trap na função especifica, passando o arguments que contem todos os argumentos passados a função
            return action(target);
          };
        }

        return Reflect.get(target, prop, reciever); //se não for uma função só pega a propriedade
      },
    });
  }
}
