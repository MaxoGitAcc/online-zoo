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

// Donation popup
const donateBtn = document.querySelector(".donate-btn");
const template = document.getElementById("donation-popup-template");

let popupInstance = null;

function closePopup() {
  if (!popupInstance) return;
  popupInstance.remove();
  popupInstance = null;
}

donateBtn.addEventListener("click", () => {
  if (popupInstance) return;

  const clone = template.content.cloneNode(true);
  document.body.appendChild(clone);

  popupInstance = document.querySelector(".popup-overlay");

  const closeBtn = popupInstance.querySelector(".popup-close");
  closeBtn.addEventListener("click", closePopup);

  popupInstance.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-overlay")) closePopup();
  });

  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") closePopup();
    },
    { once: true }
  );

  const steps = popupInstance.querySelectorAll(".popupStep");
  const dots = popupInstance.querySelectorAll(".dot");
  const nextBtn = popupInstance.querySelector(".popupNextBtn");
  const nextText = popupInstance.querySelector(".popupNextText");
  const backBtn = popupInstance.querySelector(".popupBackBtn");

  let currentStep = 1;

  function showStep(stepNumber) {
    steps.forEach(s => s.classList.remove("is-active"));
    dots.forEach(d => d.classList.remove("is-active"));

    popupInstance.querySelector(`.popupStep[data-step="${stepNumber}"]`)?.classList.add("is-active");
    popupInstance.querySelector(`.dot[data-dot="${stepNumber}"]`)?.classList.add("is-active");

    currentStep = stepNumber;

    backBtn.hidden = currentStep === 1;

    nextText.textContent = currentStep === 3 ? "Finish" : "Next";
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep < 3) showStep(currentStep + 1);
    else closePopup();
  });

  backBtn.addEventListener("click", () => {
    if (currentStep > 1) showStep(currentStep - 1);
  });
});