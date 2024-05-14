import { baseUrl } from "./utils/utils.js";

document.querySelector("button").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../html/login.html";
});

window.addEventListener("load", async() => {
  try {
    const result = await fetch(`${baseUrl}/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": `${localStorage.getItem("token")}`
      }
    });

    const data = await result.json();

    if(!data.status) {
      throw new Error("Token inválido");
    }

    const logado = document.querySelector("#logado");
    logado.innerHTML = `Olá, ${data.nome}`;
  } catch(error) {
    window.location.href = "../html/login.html";
  }
});