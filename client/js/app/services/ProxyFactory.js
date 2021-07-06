class ProxyFactory {
  static create(model, props, action) {
    return new Proxy(model, {
      get(target, prop, reciever) {
        if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
          
          return function () {
            //se for retorna uma nova function aplicando as traps
            Reflect.apply(target[prop], target, arguments); //aplica a trap na função especifica, passando o arguments que contem todos os argumentos passados a função
            return action(target);
          };
        }

        return Reflect.get(target, prop, reciever); //se não for uma função só pega a propriedade
      },

      set(target, prop, value, reciever) {
        if (props.includes(prop)) {
          action(target);
        }
        
        return Reflect.set(target, prop, value, reciever);
      },
    });
  }

  static _isFunction(fn) {
    return typeof fn == typeof Function; //verifica se é uma function
  }
}
