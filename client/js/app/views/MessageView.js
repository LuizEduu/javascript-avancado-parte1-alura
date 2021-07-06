class MessageView extends View {
  constructor(element) {
    super(element);
  }

  template(model) {
    console.log(model.content)
    return model.content ? `<p class="alert alert-info">${model.content}</p>`: "";
  }
}
