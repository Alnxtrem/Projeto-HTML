const form = document.getElementById("form");
const statusEl = document.getElementById("form-status");
const submitButton = document.getElementById("submit-button");
const yearEl = document.getElementById("current-year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form && statusEl && submitButton) {
  const fields = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    mensagem: document.getElementById("mensagem"),
  };

  function resetFieldState() {
    Object.values(fields).forEach((field) => {
      field.classList.remove("input-error");
    });

    statusEl.textContent = "";
    statusEl.classList.remove("is-error", "is-success");
  }

  function setError(field, message) {
    field.classList.add("input-error");
    statusEl.textContent = message;
    statusEl.classList.add("is-error");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    resetFieldState();

    const nome = fields.nome.value.trim();
    const email = fields.email.value.trim();
    const mensagem = fields.mensagem.value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

    if (nome.length < 3) {
      setError(fields.nome, "Informe um nome com pelo menos 3 caracteres.");
      fields.nome.focus();
      return;
    }

    if (!emailValido) {
      setError(fields.email, "Digite um email válido para continuarmos.");
      fields.email.focus();
      return;
    }

    if (mensagem.length < 10) {
      setError(fields.mensagem, "A mensagem precisa ter pelo menos 10 caracteres.");
      fields.mensagem.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    statusEl.textContent = "Mensagem validada. Simulando envio...";

    window.setTimeout(function () {
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Enviar mensagem";
      statusEl.textContent = "Mensagem enviada com sucesso. Obrigado pelo contato!";
      statusEl.classList.remove("is-error");
      statusEl.classList.add("is-success");
    }, 900);
  });
}
