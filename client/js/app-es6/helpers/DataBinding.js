class DataBinding {
  constructor(model, view, ...props) {
    const proxy = ProxyFactory.create(model, props, () => { //toda vez que model for acessado ele chama o update da view
      view.update(model);
    });

    view.update(model);
    return proxy;
  }
}
