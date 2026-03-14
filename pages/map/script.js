fetch("/assets/components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header-root").innerHTML = html;

    // active nav
    const page = document.body.dataset.page;
    document.querySelectorAll(".nav-item").forEach(li => {
      const link = li.querySelector("a");
      if (link?.dataset.page === page) li.classList.add("active");
    });

    // btn listener (NOW it exists)
    const btn = document.querySelector(".btnToLiveCam");
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.href = "../map/index.html";
      });
    }
  })
  .catch(err => console.error("Header load failed:", err));

fetch("/assets/components/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-root").innerHTML = html;
  })
  .catch(err => console.error("Footer load failed:", err));