var email = document.getElementById("inputLog");
var pw = document.getElementById("inputSenha");

function showLogin() {
  var x = document.getElementById("loginPage");

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function register() {
  fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.getAttribute("value"),
      password: pw.getAttribute("value"),
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) alert(json.error);
      else setTokenInCookie(json.token);
    });
}

function login() {
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.getAttribute("value"),
      password: pw.getAttribute("value"),
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) alert(json.error);
      else setTokenInCookie(json.token);
    });
}

function getLoginFromReqRes() {
  fetch("https://reqres.in/api/users/2")
    .then((res) => res.json())
    .then((json) => {
      email.setAttribute("value", json.data.email);
      pw.setAttribute("value", json.data.first_name);
    });
}

function setTokenInCookie(token) {
  token ? (document.cookie = "loginToken=" + token) : token;
}

function getTokenFromCookie() {
  cookie = document.cookie.split("=");
  return cookie[0] === "loginToken" && cookie[1] != undefined
    ? cookie[1]
    : undefined;
}

window.onload = () => {
  if (getTokenFromCookie()) {
    alert("usuário logado");
  }
};
