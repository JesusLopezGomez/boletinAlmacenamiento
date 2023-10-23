const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(JSON.parse(this.responseText)[0]);
  }
});

xhr.open("GET", "http://localhost:3000/users?nombre=yeray");
xhr.setRequestHeader("Accept", "application/json");

xhr.send(data);