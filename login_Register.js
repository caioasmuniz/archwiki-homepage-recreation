var email = document.getElementById("inputLog");
var pw = document.getElementById("inputSenha");
var loginPage = document.getElementById("loginPage");
const cep = document.querySelector("#cep");

function showLogin() {
  loginPage.style.display =
    loginPage.style.display === "none" ? "block" : "none";
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
      else logUserIn(json.token);
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
      else logUserIn(json.token);
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

function logUserIn(token) {
  if (token) {
    document.cookie = "loginToken=" + token;
    showLoggedInPage();
  }
}

function getTokenFromCookie() {
  cookie = document.cookie.split("=");
  return cookie[0] === "loginToken" && cookie[1] != undefined
    ? cookie[1]
    : undefined;
}

function showLoggedInPage() {
  loginPage.style.display = "none";
  document.getElementById("loggedInPage").style.display = "block";
  document.getElementById("divShowLogin").style.display = "none";
}

window.onload = () => {
  if (getTokenFromCookie()) {
    showLoggedInPage();
  }
};

function search(query) {
  let url = new URL("http://universities.hipolabs.com/search");
  url.searchParams.set( "name", query );
  fetch(url)
    .then((res) => res.json())
    .then((json) => {return json});
}
