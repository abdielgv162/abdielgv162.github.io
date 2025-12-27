document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("copy-btn")) return;

  const code = e.target.closest(".code-box").querySelector("pre").innerText;

  navigator.clipboard.writeText(code).then(() => {
    e.target.innerText = "Copiado";
    setTimeout(() => (e.target.innerText = "Copiar"), 1500);
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const tocList = document.querySelector("#toc ul");
  const headings = document.querySelectorAll("h2, h3");

  headings.forEach(heading => {
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;

    if (heading.tagName === "H3") {
      li.style.marginLeft = "1rem";
    }

    li.appendChild(a);
    tocList.appendChild(li);
  });
});
