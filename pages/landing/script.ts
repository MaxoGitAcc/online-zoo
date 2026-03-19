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

const liveCamBtn = document.querySelector(".btnToLiveCam");
if (liveCamBtn) {
  liveCamBtn.addEventListener("click", () => {
    window.location.href = "../map/index.html";
  });
}

fetch("/assets/components/footer.html")
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
    let pets;
    try {
      pets = await getPets();
    } catch {
      pets = await getPets();
    }

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

    setupMeetPetsButtons();
  } catch (error) {
    console.log(error);
    loader.hidden = true;
    errorEl.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderPets();
});


function setupMeetPetsButtons(): void {
  const viewport = document.querySelector<HTMLElement>(".animal-cards-viewport");
  const grid = document.querySelector<HTMLElement>(".animal-cards");
  const left = document.querySelector<HTMLButtonElement>(".listBtnLeft");
  const right = document.querySelector<HTMLButtonElement>(".listBtnRight");
  if (!viewport || !grid || !left || !right) return;

  function getPageWidth(): number {
    const card = grid!.querySelector(".animal-card");
    if (!card) return 0;
    const cardW = card.getBoundingClientRect().width;
    const styles = getComputedStyle(grid!);
    const gap = parseFloat(styles.gap) || 30;
    return cardW * 4 + gap * 3;
  }

  left.addEventListener("click", () => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft <= 0) {
      viewport.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      viewport.scrollBy({ left: -getPageWidth(), behavior: "smooth" });
    }
  });

  right.addEventListener("click", () => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft >= maxScroll - 1) {
      viewport.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      viewport.scrollBy({ left: getPageWidth(), behavior: "smooth" });
    }
  });
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

  function getTotalPages(): number {
    return Math.ceil(msgs!.children.length / 4);
  }

  btns[0].addEventListener("click", () => {
    const total = getTotalPages();
    if (currentPage <= 0) {
      currentPage = total - 1;
    } else {
      currentPage--;
    }
    msgs.style.transform = `translateX(-${currentPage * pageWidth}px)`;
  });

  btns[1].addEventListener("click", () => {
    const total = getTotalPages();
    if (currentPage >= total - 1) {
      currentPage = 0;
    } else {
      currentPage++;
    }
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
import { submitDonation, getUserProfile } from "../../src/api/api";
import { SavedCard } from "../../src/types/types";

const donateBtn = document.querySelector(".donate-btn");
const template = document.getElementById("donation-popup-template") as HTMLTemplateElement;

let popupInstance: HTMLElement | null = null;

function closePopup(): void {
  if (!popupInstance) return;
  popupInstance.remove();
  popupInstance = null;
  document.body.style.overflow = "";
}

function showNotification(message: string, success: boolean): void {
  const notification = document.createElement("div");
  notification.className = `donation-notification ${success ? "success" : "error"}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}

if (donateBtn && template) {
  donateBtn.addEventListener("click", async () => {
    if (popupInstance) return;

    const clone = template.content.cloneNode(true);
    document.body.appendChild(clone);
    document.body.style.overflow = "hidden";

    popupInstance = document.querySelector(".popup-overlay");

    const closeBtn = popupInstance!.querySelector<HTMLButtonElement>(".popup-close");
    const nextBtn = popupInstance!.querySelector<HTMLButtonElement>(".popupNextBtn");
    const nextText = popupInstance!.querySelector<HTMLElement>(".popupNextText");
    const backBtn = popupInstance!.querySelector<HTMLElement>(".popupBackBtn");
    if (!closeBtn || !nextBtn || !nextText || !backBtn) return;

    closeBtn.addEventListener("click", closePopup);
    popupInstance!.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("popup-overlay")) closePopup();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    }, { once: true });


    let selectedAmount: number | null = null;
    const amountBtns = popupInstance!.querySelectorAll<HTMLButtonElement>(".donationAmountPopup button");
    const otherAmountInput = popupInstance!.querySelector<HTMLInputElement>("#otherAmountInput");
    const otherAmountError = popupInstance!.querySelector<HTMLElement>("#otherAmountError");
    const petSelect = popupInstance!.querySelector<HTMLSelectElement>("#petSelect");

    function checkStep1(): void {
      const petSelected = petSelect!.value !== "";
      const amountValid = selectedAmount !== null && selectedAmount > 0;
      nextBtn!.disabled = !(petSelected && amountValid);
    }

    amountBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        amountBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        selectedAmount = Number(btn.dataset.amount);
        if (otherAmountInput) otherAmountInput.value = btn.dataset.amount ?? "";
        checkStep1();
      });
    });

    otherAmountInput?.addEventListener("input", () => {
      const val = otherAmountInput.value;
      const num = Number(val);
      if (val === "" || isNaN(num) || num <= 0 || /e/i.test(val)) {
        if (otherAmountError) otherAmountError.textContent = "Please enter a valid amount greater than 0";
        selectedAmount = null;
      } else {
        if (otherAmountError) otherAmountError.textContent = "";
        selectedAmount = num;
        amountBtns.forEach(b => b.classList.remove("is-active"));
      }
      checkStep1();
    });

    petSelect?.addEventListener("change", checkStep1);
    nextBtn.disabled = true;

    const donorName = popupInstance!.querySelector<HTMLInputElement>("#donorName");
    const donorEmail = popupInstance!.querySelector<HTMLInputElement>("#donorEmail");
    const donorNameError = popupInstance!.querySelector<HTMLElement>("#donorNameError");
    const donorEmailError = popupInstance!.querySelector<HTMLElement>("#donorEmailError");
    const token = localStorage.getItem("token");
    const saveCardCheckbox = popupInstance!.querySelector<HTMLInputElement>("#saveCardCheckbox");

    if (token && donorName && donorEmail) {
      try {
        const profile = await getUserProfile();
        donorName.value = profile.name;
        donorEmail.value = profile.email;
      } catch {}
    }

    if (token && saveCardCheckbox) {
      const saveCardLabel = popupInstance!.querySelector<HTMLElement>("#saveCardLabel");
      if (saveCardLabel) saveCardLabel.hidden = false;
    }

    function validateDonorName(v: string): string {
      if (!/^[a-zA-Z ]+$/.test(v)) return "Name should contain only letters and spaces";
      if (v.trim().length < 1) return "Name is required";
      return "";
    }

    function validateDonorEmail(v: string): string {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Invalid email format";
      return "";
    }

    function checkStep2(): void {
      if (!donorName || !donorEmail) return;
      const nameValid = validateDonorName(donorName.value) === "";
      const emailValid = validateDonorEmail(donorEmail.value) === "";
      nextBtn!.disabled = !(nameValid && emailValid);
    }

    donorName?.addEventListener("input", () => {
      const error = validateDonorName(donorName.value);
      if (donorNameError) donorNameError.textContent = error;
      checkStep2();
    });

    donorEmail?.addEventListener("input", () => {
      const error = validateDonorEmail(donorEmail.value);
      if (donorEmailError) donorEmailError.textContent = error;
      checkStep2();
    });

    const cardNumber = popupInstance!.querySelector<HTMLInputElement>("#cardNumber");
    const cardCvv = popupInstance!.querySelector<HTMLInputElement>("#cardCvv");
    const selectMonth = popupInstance!.querySelector<HTMLSelectElement>("#selectMonth");
    const selectYear = popupInstance!.querySelector<HTMLSelectElement>("#selectYear");
    const savedCardsSelect = popupInstance!.querySelector<HTMLSelectElement>("#savedCardsSelect");

    const savedCards: SavedCard[] = JSON.parse(localStorage.getItem("savedCards") ?? "[]");
    if (savedCards.length > 0 && savedCardsSelect) {
      savedCardsSelect.hidden = false;
      savedCards.forEach((card, i) => {
        const opt = document.createElement("option");
        opt.value = String(i);
        opt.textContent = `${card.cardNumber.slice(0, 4)} **** **** ${card.cardNumber.slice(-4)}`;
        savedCardsSelect.appendChild(opt);
      });
      savedCardsSelect.addEventListener("change", () => {
        const card = savedCards[Number(savedCardsSelect.value)];
        if (card && cardNumber && cardCvv && selectMonth && selectYear) {
          cardNumber.value = card.cardNumber;
          cardCvv.value = card.cvv;
          const [mm, yy] = card.expiry.split("/");
          selectMonth.value = String(parseInt(mm));
          selectYear.value = `20${yy}`;
          checkStep3();
        }
      });
    }

    function validateCardNumber(v: string): boolean {
      return /^\d{16}$/.test(v.replace(/\s/g, ""));
    }

    function validateCvv(v: string): boolean {
      return /^\d{3}$/.test(v);
    }

    function validateExpiry(): boolean {
      if (!selectMonth || !selectYear) return false;
      const month = parseInt(selectMonth.value);
      const year = parseInt(selectYear.value);
      if (!month || !year) return false;
      const expiry = new Date(year, month - 1);
      return expiry > new Date();
    }

    function checkStep3(): void {
      const cardValid = validateCardNumber(cardNumber?.value ?? "");
      const cvvValid = validateCvv(cardCvv?.value ?? "");
      const expiryValid = validateExpiry();
      nextBtn!.disabled = !(cardValid && cvvValid && expiryValid);
    }

    cardNumber?.addEventListener("input", checkStep3);
    cardCvv?.addEventListener("input", checkStep3);
    selectMonth?.addEventListener("change", checkStep3);
    selectYear?.addEventListener("change", checkStep3);

    let currentStep = 1;

    function showStep(stepNumber: number): void {
      popupInstance!.querySelectorAll(".popupStep").forEach(s => s.classList.remove("is-active"));
      popupInstance!.querySelectorAll(".dot").forEach(d => d.classList.remove("is-active"));
      popupInstance!.querySelector(`.popupStep[data-step="${stepNumber}"]`)?.classList.add("is-active");
      popupInstance!.querySelector(`.dot[data-dot="${stepNumber}"]`)?.classList.add("is-active");
      currentStep = stepNumber;
      backBtn!.hidden = currentStep === 1;
      nextText!.textContent = currentStep === 3 ? "Donate" : "Next";

      if (stepNumber === 1) { checkStep1(); }
      if (stepNumber === 2) { checkStep2(); }
      if (stepNumber === 3) { nextBtn!.disabled = true; checkStep3(); }
    }

    nextBtn.addEventListener("click", async () => {
      if (currentStep < 3) {
        showStep(currentStep + 1);
      } else {
        try {
          await submitDonation({
            name: donorName?.value ?? "",
            email: donorEmail?.value ?? "",
            amount: selectedAmount!,
            petId: Number(petSelect?.value),
          });

          if (saveCardCheckbox?.checked && cardNumber && cardCvv && selectMonth && selectYear) {
            const month = selectMonth.value.padStart(2, "0");
            const year = selectYear.value.slice(-2);
            const newCard: SavedCard = {
              cardNumber: cardNumber.value.replace(/\s/g, ""),
              expiry: `${month}/${year}`,
              cvv: cardCvv.value,
            };
            const existing: SavedCard[] = JSON.parse(localStorage.getItem("savedCards") ?? "[]");
            existing.push(newCard);
            localStorage.setItem("savedCards", JSON.stringify(existing));
          }

          closePopup();
          showNotification(`Thank you for your donation of $${selectedAmount} to ${petSelect?.options[petSelect.selectedIndex]?.text}!`, true);
        } catch {
          closePopup();
          showNotification("Something went wrong. Please, try again later.", false);
        }
      }
    });

    backBtn.addEventListener("click", () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });

    showStep(1);
  });
}