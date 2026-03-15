import { initHeader } from "../../src/utils/header";

fetch("/assets/components/header.html")
  .then((res) => res.text())
  .then((html) => {
    const headerRoot = document.getElementById("header-root");
    if (!headerRoot) return;
    headerRoot.innerHTML = html;

    initHeader();

    const page = document.body.dataset.page;
    document.querySelectorAll(".nav-item").forEach((li) => {
      const link = li.querySelector("a");
      if (!link) return;
      if (link.dataset.page === page) {
        li.classList.add("active");
      }
    });
  })
  .catch((err) => console.error("Header load failed:", err));

fetch("/assets/components/footer.html")
  .then((res) => res.text())
  .then((html) => {
    const footerRoot = document.getElementById("footer-root");
    if (!footerRoot) return;
    footerRoot.innerHTML = html;
  })
  .catch((err) => console.error("Footer load failed:", err));