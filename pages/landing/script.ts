fetch("../../assets/components/header.html")
  .then((res) => res.text())
  .then((html) => {
    const heeaderRoot = document.getElementById("header-root");
    if (!heeaderRoot) return;
    heeaderRoot.innerHTML = html;

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

const liveCamBtn = document.querySelector(".btnToLiveCam");
if (liveCamBtn) {
  liveCamBtn.addEventListener("click", () => {
    window.location.href = "../map/index.html";
  });
}

fetch("../../assets/components/footer.html")
  .then((res) => res.text())
  .then((html) => {
    const footerRoot = document.getElementById("footer-root");
    if (!footerRoot) return;
    footerRoot.innerHTML = html;
  })
  .catch((err) => console.error("Footer load failed:", err));

// ******** MEET PETS ********* //
import { getPets } from "../../src/api/api";

const petImages: Record<string, string> = {
  "Lucas": "../../assets/images/animaCards/panda.png",
  "Andy": "../../assets/images/animaCards/lemur.png",
  "Glen": "../../assets/images/animaCards/gorila.png",
  "Mike": "../../assets/images/animaCards/aligator.png",
  "Sam & Lora": "../../assets/images/animaCards/eagle.png",
  "Liz": "../../assets/images/animaCards/koala.png",
  "Shake": "../../assets/images/animaCards/lion.png",
  "Senja": "../../assets/images/animaCards/tiger.png",
};

async function fetchAndRenderPets(): Promise<void> {
  const loader = document.getElementById("petsLoader");
  const errorEl = document.getElementById("petsError");
  const grid = document.querySelector<HTMLElement>(".animal-cards");
  if (!loader || !errorEl || !grid) return;

  loader.hidden = false;

try {
    const pets = await getPets();
    console.log(pets[0]);

    loader.hidden = true;

    pets.forEach((pet) => {
      const card = document.createElement("article");
      const img = petImages[pet.name] ?? "../../assets/images/animaCards/panda.png";
      card.className = "animal-card";

      card.innerHTML = `
        <div class="animal-card-img-wrap">
          <a class="zoolink" href="../zoos/index.html?id=${pet.id}">
            <img src="${img}" alt="${pet.name}" />
            <span class="animal-card-name">${pet.name}</span>
          </a>
        </div>
        <div class="animal-card-content">
          <h3>${pet.name}</h3>
          <p>${pet.description}</p>
          <a href="#" class="animal-card-link">VIEW LIVE CAM <span>→</span></a>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.log(error);
    loader.hidden = true;
    errorEl.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderPets();
  setupMeetPetsButtons();
});


function setupMeetPetsButtons() {
  const viewport = document.querySelector<HTMLElement>(
    ".animal-cards-viewport",
  );
  const grid = document.querySelector<HTMLElement>(".animal-cards");
  const left = document.querySelector<HTMLButtonElement>(".listBtnLeft");
  const right = document.querySelector<HTMLButtonElement>(".listBtnRight");
  if (!viewport || !grid || !left || !right) return;

  function getPageWidth() {
    const card = grid!.querySelector(".animal-card");
    if (!card) return 0;

    const cardW = card.getBoundingClientRect().width;
    const styles = getComputedStyle(grid!);
    const gap = parseFloat(styles.gap) || 30;

    return cardW * 4 + gap * 3;
  }

  function updateDisabled() {
    const maxScroll = viewport!.scrollWidth - viewport!.clientWidth;

    left!.disabled = viewport!.scrollLeft <= 0;
    right!.disabled = viewport!.scrollLeft >= maxScroll - 1;
  }

  left.addEventListener("click", () => {
    viewport.scrollBy({ left: -getPageWidth(), behavior: "smooth" });
    setTimeout(updateDisabled, 400);
  });

  right.addEventListener("click", () => {
    viewport.scrollBy({ left: getPageWidth(), behavior: "smooth" });
    setTimeout(updateDisabled, 400);
  });

  viewport.addEventListener("scroll", updateDisabled);
  window.addEventListener("resize", updateDisabled);

  updateDisabled();
}

document.addEventListener("DOMContentLoaded", () => {
  setupMeetPetsButtons();
});

// ******** user opinion ********* //
import { getFeedback } from "../../src/api/api";

async function fetchAndRenderFeedback(): Promise<void> {
 const loader = document.getElementById("feedbackLoader");
  const errorEl = document.getElementById("feedbackError");
  const container = document.querySelector<HTMLElement>(".user-opinion-msgs");
  if (!loader || !errorEl || !container) return;

  loader.hidden = false;

  try {
    const feedback = await getFeedback();
    loader.hidden = true;

    feedback.forEach((i) => {
      const msgEl = document.createElement("article");
      msgEl.className = "user-opinion-msg";

      msgEl.innerHTML = `
        <div class="user-opinion-wrap">
          <h3>"</h3>
          <p>${i.text}</p>
          <span>${i.name}</span>
        </div>
      `;

      container.appendChild(msgEl);
      setupFeedbackButtons();
    });
  } catch (error) {
    loader.hidden = true;
    errorEl.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderPets();
  fetchAndRenderFeedback();
});

function setupFeedbackButtons(): void {
  const msgs = document.querySelector<HTMLElement>(".user-opinion-msgs");
  const btns = document.querySelectorAll<HTMLButtonElement>(".user-opinion-btns");
  if (!msgs || btns.length < 2) return;

  let currentPage = 0;
  const pageWidth = 1230 + 30;

  btns[0].addEventListener("click", () => {
    if (currentPage > 0) currentPage--;
    msgs.style.transform = `translateX(-${currentPage * pageWidth}px)`;
  });

  btns[1].addEventListener("click", () => {
    currentPage++;
    msgs.style.transform = `translateX(-${currentPage * pageWidth}px)`;
  });
}

// ******** POPUP ********* //
function openWelcomePopup() {
  const tpl = document.getElementById("welcome-popup") as HTMLTemplateElement;
  if (!tpl) {
    console.error("welcome-popup template not found");
    return;
  }

  const existing = document.querySelector("[data-popup-overlay]");
  if (existing) existing.remove();

  document.body.appendChild(tpl.content.cloneNode(true));

  const overlay = document.querySelector<HTMLElement>("[data-popup-overlay]");
  const closeBtn = document.querySelector<HTMLElement>("[data-popup-close]");
  if (!overlay || !closeBtn) return;
  const amountBtns = document.querySelectorAll<HTMLButtonElement>(
    ".popup1-btns button",
  );

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
const template = document.getElementById(
  "donation-popup-template",
) as HTMLTemplateElement;

let popupInstance: HTMLElement | null = null;

function closePopup() {
  if (!popupInstance) return;
  popupInstance.remove();
  popupInstance = null;
}

if (donateBtn && template) {
  donateBtn.addEventListener("click", () => {
    if (popupInstance) return;

    const clone = template.content.cloneNode(true);
    document.body.appendChild(clone);

    popupInstance = document.querySelector(".popup-overlay");

    const closeBtn =
      popupInstance!.querySelector<HTMLButtonElement>(".popup-close");
    closeBtn!.addEventListener("click", closePopup);

    popupInstance!.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("popup-overlay")) closePopup();
    });

    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") closePopup();
      },
      { once: true },
    );

    const steps = popupInstance!.querySelectorAll(".popupStep");
    const dots = popupInstance!.querySelectorAll(".dot");
    const nextBtn =
      popupInstance!.querySelector<HTMLButtonElement>(".popupNextBtn");
    const nextText =
      popupInstance!.querySelector<HTMLButtonElement>(".popupNextText");
    const backBtn = popupInstance!.querySelector<HTMLElement>(".popupBackBtn");
    if (!closeBtn || !nextBtn || !nextText || !backBtn) return;

    let currentStep = 1;

    function showStep(stepNumber: number) {
      steps.forEach((s) => s.classList.remove("is-active"));
      dots.forEach((d) => d.classList.remove("is-active"));

      popupInstance!
        .querySelector(`.popupStep[data-step="${stepNumber}"]`)
        ?.classList.add("is-active");
      popupInstance!
        .querySelector(`.dot[data-dot="${stepNumber}"]`)
        ?.classList.add("is-active");

      currentStep = stepNumber;

      backBtn!.hidden = currentStep === 1;

      nextText!.textContent = currentStep === 3 ? "Finish" : "Next";
    }

    nextBtn.addEventListener("click", () => {
      if (currentStep < 3) showStep(currentStep + 1);
      else closePopup();
    });

    backBtn.addEventListener("click", () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });
  });
}
