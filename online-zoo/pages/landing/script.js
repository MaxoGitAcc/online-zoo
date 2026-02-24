fetch("../../assets/components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header-root").innerHTML = html;

    const page = document.body.dataset.page;
    document.querySelectorAll(".nav a").forEach(a => {
      if (a.dataset.page === page) a.classList.add("active");
    });
  })
  .catch(err => console.error("Header load failed:", err));

document.querySelector(".btnToLiveCam").addEventListener("click", () => {
  window.location.href = "../map/index.html";
});




// ******** POPUP ********* //
function openWelcomePopup() {
  const tpl = document.getElementById("welcome-popup");
  if (!tpl) {
    console.error("welcome-popup template not found");
    return;
  }

  const existing = document.querySelector("[data-popup-overlay]");
  if (existing) existing.remove();

  document.body.appendChild(tpl.content.cloneNode(true));

  const overlay = document.querySelector("[data-popup-overlay]");
  const closeBtn = document.querySelector("[data-popup-close]");
  const amountBtns = document.querySelectorAll(".popup1-btns button");

  const closePopup = () => overlay.remove();

  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      closePopup();
      document.removeEventListener("keydown", escHandler);
    }
  });

  amountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = btn.dataset.amount;
      if (amount === "other") {
        alert("Other amount clicked");
      } else {
        alert(`You selected $${amount}`);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  openWelcomePopup();
});