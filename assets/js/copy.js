document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("copy-btn")) return;

  const code = e.target.closest(".code-box").querySelector("pre").innerText;

  navigator.clipboard.writeText(code).then(() => {
    e.target.innerText = "Copiado";
    setTimeout(() => (e.target.innerText = "Copiar"), 1500);
  });
});
