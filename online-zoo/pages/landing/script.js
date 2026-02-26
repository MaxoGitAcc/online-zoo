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


// ******** MEET PETS ********* //
function renderMeetPets() {
  const grid = document.querySelector(".animal-cards");
  if (!grid) return;

  const animals = [
    {
      name: "Lucas",
      title: "Giant Panda",
      desc: "Native to central China, giant pandas have come to symbolize vulnerable species.",
      img: "../../assets/images/animaCards/panda.png",
      camLink: "#",
    },
    {
      name: "Andy",
      title: "Madagascarian Lemur",
      desc: "Lemurs are considered the world's most endangered group of mammals.",
      img: "../../assets/images/animaCards/lemur.png",
      camLink: "#",
    },
    {
      name: "Glen",
      title: "Gorilla in Congo",
      desc: "Variety of snacks very important for the healthy life of gorillas and plenty of babies.",
      img: "../../assets/images/animaCards/gorila.png",
      camLink: "#",
    },
    {
      name: "Mike",
      title: "Chinese Alligator",
      desc: "From nose to tail, belly to back, hard scales protect this petite alligator.",
      img: "../../assets/images/animaCards/aligator.png",
      camLink: "#",
    },
    {
      name: "Sam & Lora",
      title: "West End Bald Eagles",
      desc: "Pair of eagle parents lay and protect eggs, feed the chicks and teach them to hunt and fly.",
      img: "../../assets/images/animaCards/eagle.png",
      camLink: "#",
    },
    {
      name: "Liz",
      title: "Australian Koala",
      desc: "The elevated walkways bring you to eye level with the koalas as they perch in their forest.",
      img: "../../assets/images/animaCards/koala.png",
      camLink: "#",
    },
    {
      name: "Shake",
      title: "African Lion",
      desc: "Lions roam the savannas and grasslands of Africa, hunting and raising cubs in the pride.",
      img: "../../assets/images/animaCards/lion.png",
      camLink: "#",
    },
    {
      name: "Senja",
      title: "Sumatran Tiger",
      desc: "Sumatran Tigers are the smallest of the five sub-species, and are found in Indonesia.",
      img: "../../assets/images/animaCards/tiger.png",
      camLink: "#",
    },
  ];

  grid.innerHTML = "";

  animals.forEach((animal) => {
    const card = document.createElement("article");
    card.className = "animal-card";

    card.innerHTML = `
      <div class="animal-card-img-wrap">
        <img src="${animal.img}" alt="${animal.title}" />
        <span class="animal-card-name">${animal.name}</span>
      </div>

      <div class="animal-card-content">
        <h3>${animal.title}</h3>
        <p>${animal.desc}</p>
        <a href="${animal.camLink}" class="animal-card-link">
          VIEW LIVE CAM <span>→</span>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMeetPets();
});

function setupMeetPetsButtons() {
  const viewport = document.querySelector(".animal-cards-viewport");
  const grid = document.querySelector(".animal-cards");
  const left = document.querySelector(".listBtnLeft");
  const right = document.querySelector(".listBtnRight");
  if (!viewport || !grid || !left || !right) return;

  function getPageWidth() {
    const card = grid.querySelector(".animal-card");
    if (!card) return 0;

    const cardW = card.getBoundingClientRect().width;
    const styles = getComputedStyle(grid);
    const gap = parseFloat(styles.gap) || 30;

    return (cardW * 4) + (gap * 3);
  }

  function updateDisabled() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    left.disabled = viewport.scrollLeft <= 0;
    right.disabled = viewport.scrollLeft >= maxScroll - 1;
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
  renderMeetPets();
  setupMeetPetsButtons();
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