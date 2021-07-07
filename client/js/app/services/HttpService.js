class HttpService {
  get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          reject(xhr.responseText);
        }
      };

      xhr.send();
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          reject(xhr.responseText);
        }
      };

      xhr.send(JSON.stringify(data))
    });
  }
}
