import { baseUrl } from "./utils/utils.js";

const button = document.querySelector(".fa-eye");

button.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");
  
  if(inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
})

document.querySelector("#button-login").addEventListener("click", async() => {
  let usuario = document.querySelector("#usuario");
  let userLabel = document.querySelector("#userLabel");
  
  let senha = document.querySelector("#senha");
  let senhaLabel = document.querySelector("#senhaLabel");
  
  let msgError = document.querySelector("#msgError");

  try {
    const user = {
      user: usuario.value,
      senha: senha.value
    }

    const result = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await result.json();
    
    if(!data.status) {
      throw new Error("Usuário ou senha incorretos");
    }

    localStorage.setItem("token", data.token);    
    window.location.href = "../html/system.html";
  } catch(error) {
    userLabel.setAttribute("style", "color: red");
    usuario.setAttribute("style", "border-color: red");
    senhaLabel.setAttribute("style", "color: red");
    senha.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou senha incorretos";
    usuario.focus();
  }
})