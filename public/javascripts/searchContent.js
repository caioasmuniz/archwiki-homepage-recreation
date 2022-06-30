document.body.onload = adcElemento;
var post = document.getElementById("inputPost");

function onPost(){
    fetch("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            publicacoes: post.value
          })
    })
    .then((res) => {
        console.log(res);
        this.adcElemento(res);
    })
}

function adcElemento(posts) {    
  
  var liNova = document.createElement("li");  
  liNova.appendChild(posts); //adiciona o nó de texto à nova div criada

  // adiciona o novo elemento criado e seu conteúdo ao DOM
  var divAtual = document.getElementById("divFormGet");
  document.body.insertBefore(liNova, divAtual);
}