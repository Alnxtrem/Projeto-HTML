// Script para recursos de interface e validação de formulário.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const mensagemInput = document.getElementById("mensagem");
  const feedback = document.getElementById("form-feedback");
  const anoAtual = document.getElementById("ano-atual");

  // Atualiza ano automaticamente no rodapé.
  anoAtual.textContent = new Date().getFullYear();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    limparErros();
    feedback.textContent = "";
    feedback.classList.remove("success");

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    let formularioValido = true;

    if (nome.length < 3) {
      exibirErro("erro-nome", "Informe um nome com pelo menos 3 caracteres.");
      formularioValido = false;
    }

    if (!validarEmail(email)) {
      exibirErro("erro-email", "Informe um e-mail válido.");
      formularioValido = false;
    }

    if (mensagem.length < 10) {
      exibirErro("erro-mensagem", "A mensagem deve ter pelo menos 10 caracteres.");
      formularioValido = false;
    }

    if (!formularioValido) {
      return;
    }

    // Simulação de envio assíncrono.
    feedback.textContent = "Enviando mensagem...";

    setTimeout(() => {
      feedback.textContent = "Mensagem enviada com sucesso! Em breve entrarei em contato.";
      feedback.classList.add("success");
      form.reset();
    }, 800);
  });
});

function exibirErro(idElemento, texto) {
  const campoErro = document.getElementById(idElemento);
  if (campoErro) {
    campoErro.textContent = texto;
  }
}

function limparErros() {
  const erros = document.querySelectorAll(".error");
  erros.forEach((erro) => {
    erro.textContent = "";
  });
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
