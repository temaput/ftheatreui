import 'core-js/es6/promise';

export function sendXHR(data, type='POST', url='/graphql') {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.open(type, url, true);

    if (type==='POST') {
      request.setRequestHeader(
        'Content-Type', 'application/json; charset=UTF-8'
      );
      data = JSON.stringify(data);
    }

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          const resp = this.responseText;
          console.log("receiving data ", resp);
          resolve(JSON.parse(resp));
        } else {
          // Error :(
          reject(Error("HTTP request failed"));
        }
      }
    };
    console.log("sending graphql ", data);
    request.send(data);
    request = null;
  }
  );
}
