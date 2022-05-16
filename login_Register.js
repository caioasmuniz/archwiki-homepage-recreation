var email = document.getElementById("inputLog");
var pw = document.getElementById("inputSenha");
var loginPage = document.getElementById("loginPage");

function showLogin() {
  loginPage.style.display =
    loginPage.style.display === "none" ? "block" : "none";
}

function ValidateUser(inputText, inputSenha) {
  let error = false;
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!inputText.value.match(re) || inputText.value.length < 3) {
    document.getElementById("invalidEmail").style.display = "block";
    error = true;
  }
  if (inputSenha.value.length < 3) {
    document.getElementById("invalidPw").style.display = "block";
    error = true;
  }

  return error;
}

function register(inputText, inputSenha) {
  var aux = ValidateUser(inputText, inputSenha);

  if (aux == false) {
    document.getElementById("invalidPw").style.display = "none";
    document.getElementById("invalidEmail").style.display = "none";

    fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: pw.value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) alert(json.error);
        else logUserIn(json.token);
      });
  }
}

function login(inputText, inputSenha) {
  var aux = ValidateUser(inputText, inputSenha);

  if (aux == false) {
    document.getElementById("invalidPw").style.display = "none";
    document.getElementById("invalidEmail").style.display = "none";

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: pw.value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) alert(json.error);
        else logUserIn(json.token);
      });
  }
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

function search() {
  var query = document.getElementById("busca").value;
  let url = new URL("http://universities.hipolabs.com/search");
  url.searchParams.set("name", query);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("Nome").innerHTML = json[0].name;
      document.getElementById("Pais").innerHTML = json[0].country;
      document.getElementById("Dominio").innerHTML = json[0].domains[0];
      document.getElementById("PaginaWeb").innerHTML = json[0].web_pages[0];
      document.getElementById("resultPage").style.display = "block";
    });
}
