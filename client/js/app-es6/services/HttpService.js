class HttpService {
  _handleErros(res) {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  }

  get(url) {
    fetch(url)
      .then((res) => this._handleErros(res))
      .then((response) => console.log(response.json()));
  }

  post(url, data) {
    return fetch(url, {
      headers: { "Content-type": "application/json" },
      method: "post",
      body: JSON.stringify(data),
    })
    .then(res => this._handleErros(res))
  }
}
