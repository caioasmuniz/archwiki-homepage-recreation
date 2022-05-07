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
    .then((json) => setTokenInCookie(json.token));
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
    .then((json) => setTokenInCookie(json.token));
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
  document.cookie = "loginToken=" + token;
}

function getTokenFromCookie() {
  cookie = document.cookie.split("=")
  return (cookie[0] === "loginToken") ? cookie[1] : undefined
}

function processLogin() {
  // valores registrados
  var storedName = localStorage.getItem("email");
  var storedPw = localStorage.getItem("pw");

  // valores nos Inputs
  var userName = document.getElementById("inputLog");
  var userPw = document.getElementById("inputSenha");

  if (
    userName.value == storedName &&
    userPw.value == storedPw &&
    userName.value != "" &&
    userPw.value != ""
  ) {
    alert("Você logou");
  } else {
    alert("nao logado");
  }
}

// ocument.onload(getTokenFromCookie() ? )