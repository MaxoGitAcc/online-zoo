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
      if (link.dataset.page === page) li.classList.add("active");
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

interface AnimalFacts {
  commonName: string;
  scientificName: string;
  type: string;
  size: string;
  diet: string;
  habitat: string;
  range: string;
}

interface Thumb {
  tag: string;
  src: string;
  liveLabel: string;
}

interface AnimalData {
  heading: string;
  liveLabel: string;
  mainCam: string;
  thumbs: Thumb[];
  bambooTitle: string;
  bambooText: string;
  didTitle: string;
  didText: string;
  longText: string;
  facts: AnimalFacts;
  sideImage: string;
  mapLink: string;
}

const data: Record<string, AnimalData> = {
  panda: {
    heading: "LIVE PANDA CAMS",
    liveLabel: "Lucas, the Giant Panda cam 1",
    mainCam: "https://www.youtube.com/embed/gnEuhfyZPPQ",
    thumbs: [
      { tag: "CAM 1", src: "https://www.youtube.com/embed/gnEuhfyZPPQ", liveLabel: "Lucas, the Giant Panda cam 1" },
      { tag: "CAM 2", src: "https://www.youtube.com/embed/3szkFHfr6sA", liveLabel: "Lucas, the Giant Panda cam 2" },
      { tag: "CAM 3", src: "https://www.youtube.com/embed/3szkFHfr6sA", liveLabel: "Lucas, the Giant Panda cam 3" },
    ],
    bambooTitle: "MAKE THE BAMBOO DONATION!",
    bambooText: "Our process for bamboo donation starts with a site evaluation. It is important that our team sees where the bamboo is growing, then determining if the bamboo is a species that our animals are currently eating. Thank you for your interest in donating bamboo for our pandas.",
    didTitle: "did you know?",
    didText: "Pandas are often seen eating in a relaxed sitting posture, with their hind legs stretched out before them. They may appear sedentary, but they are skilled tree-climbers and efficient swimmers.",
    longText: "Giant pandas are very unusual animals that eat almost exclusively bamboo, which is very low in nutrients. Because of this, they have many unique adaptations for their low-energy lifestyle. Giant pandas are solitary. They have a highly developed sense of smell that males use to avoid each other and to find females for mating in the spring. After a five-month pregnancy, females give birth to a cub or two, though they cannot care for both twins. The blind infants weigh only 5 ounces at birth and cannot crawl until they reach three months of age. They are born white, and develop their much loved coloring later. Habitat loss is the primary threat to this species. Its popularity around the world has helped the giant panda become the focus of successful conservation programs.",
    facts: {
      commonName: "Giant Panda",
      scientificName: "Ailuropoda melanoleuca",
      type: "Herbivore",
      size: "4 to 5 feet",
      diet: "Omnivore",
      habitat: "Forests",
      range: "Eastern Asia",
    },
    sideImage: "../../assets/images/smalss/pandaSmall.png",
    mapLink: "/pages/map/index.html",
  },
  eagles: {
    heading: "BALD EAGLE CAMS",
    liveLabel: "Eagles cam 1",
    mainCam: "https://www.youtube.com/embed/B4-L2nfGcuE",
    thumbs: [
      { tag: "CAM 1", src: "https://www.youtube.com/embed/B4-L2nfGcuE", liveLabel: "Eagles cam 1" },
      { tag: "CAM 2", src: "https://www.youtube.com/embed/B4-L2nfGcuE", liveLabel: "Eagles cam 2" },
      { tag: "CAM 3", src: "https://www.youtube.com/embed/B4-L2nfGcuE", liveLabel: "Eagles cam 3" },
    ],
    bambooTitle: "KEEP THE BALD EAGLE CAMS STREAMING!",
    bambooText: "Watch as this lifelong pair of eagle parents lay and protect eggs, feed their chicks and teach them to hunt and fly. Sam & Lora have stolen the hearts of thousands of viewers! 100% of the donations from this page will be utilized directly for the streaming and operational costs of this project.",
    didTitle: "did you know?",
    didText: "Because of its role as a symbol of the US, but also because of its being a large predator, the bald eagle has many representations in popular culture. Not all of these representations are accurate. In particular, the movie or television bald eagle typically has a bold, powerful cry. The actual eagle has a much softer, chirpy voice, not in keeping with its popular image.",
    longText: "The bald eagle, with its snowy-feathered (not bald) head and white tail, is the proud national bird symbol of the United States—yet the bird was nearly wiped out there. For many decades, bald eagles were hunted for sport and for the protection of fishing grounds. These powerful birds of prey use their talons to fish, but they get many of their meals by scavenging carrion or stealing the kills of other animals.",
    facts: {
      commonName: "Bald Eagle",
      scientificName: "Haliaeetus leucocephalus",
      type: "Birds",
      size: "Body: 34 to 43 inches; wingspan: 6 to 8 feet",
      diet: "Carnivore",
      habitat: "Seacoasts, rivers, large lakes or marshes",
      range: "Continental United States",
    },
    sideImage: "../../assets/images/smalss/eagleSmall.png",
    mapLink: "/pages/map/index.html",
  },
  gorillas: {
    heading: "GORILLAS CAMS",
    liveLabel: "Gorillas cam 1",
    mainCam: "https://www.youtube.com/embed/672cUSe69J0",
    thumbs: [
      { tag: "CAM 1", src: "https://www.youtube.com/embed/672cUSe69J0", liveLabel: "Gorillas cam 1" },
      { tag: "CAM 2", src: "https://www.youtube.com/embed/672cUSe69J0", liveLabel: "Gorillas cam 2" },
      { tag: "CAM 3", src: "https://www.youtube.com/embed/672cUSe69J0", liveLabel: "Gorillas cam 3" },
    ],
    bambooTitle: "MAKE A DIFFERENCE FOR THE GORILLAS!",
    bambooText: "Your support helps us protect gorillas and their habitats through education and conservation.",
    didTitle: "did you know?",
    didText: "In addition to having distinctive fingerprints like humans do, gorillas also have unique nose prints. Gorillas are the largest of the great apes, but the western lowland gorilla is the smallest of the subspecies.",
    longText: "Western lowland gorillas are the smallest of the four subspecies. They live in thick tropical rainforests, where they find plenty of food for their vegetarian diet. They eat roots, shoots, fruit, wild celery, and tree bark and pulp.",
    facts: {
      commonName: "Western lowland gorillas",
      scientificName: "Gorilla gorilla gorilla",
      type: "Mammals",
      size: "Standing height, four to six feet",
      diet: "Omnivore",
      habitat: "Rainforests",
      range: "Western Africa",
    },
    sideImage: "../../assets/images/smalss/gorillaSmall.png",
    mapLink: "/pages/map/index.html",
  },
  lemurs: {
    heading: "LEMURS CAMS",
    liveLabel: "Lemurs cam 1",
    mainCam: "https://www.youtube.com/embed/abbR-Ttd-cA",
    thumbs: [
      { tag: "CAM 1", src: "https://www.youtube.com/embed/abbR-Ttd-cA", liveLabel: "Lemurs cam 1" },
      { tag: "CAM 2", src: "https://www.youtube.com/embed/abbR-Ttd-cA", liveLabel: "Lemurs cam 2" },
      { tag: "CAM 3", src: "https://www.youtube.com/embed/abbR-Ttd-cA", liveLabel: "Lemurs cam 3" },
    ],
    bambooTitle: "PROVIDE ANDY THE LEMUR WITH FRUITS!",
    bambooText: "More than 90% of lemur species are endangered and might face extinction in the nearest future. Watch the ring-tailed lemurs play and climb in this soothing setting and support them by donating for the fruits they adore.",
    didTitle: "did you know?",
    didText: "A ring-tailed lemur mob will gather in open areas of the forest to sunbathe. They sit in what some call a yoga position with their bellies toward the sun and their arms and legs stretched out to the sides.",
    longText: "Ring-tailed lemurs are named for the 13 alternating black and white bands that adorn their tails. Unlike most other lemurs, ringtails spend 40 percent of their time on the ground, moving quadrupedally along the forest floor.",
    facts: {
      commonName: "Ring-Tailed Lemur",
      scientificName: "Lemur catta",
      type: "Mammals",
      size: "Head and body: 17.75 inches; tail: 21.75 inches",
      diet: "Herbivore",
      habitat: "Arid, open areas and forests",
      range: "Southeast Asia",
    },
    sideImage: "../../assets/images/smalss/lemurSmall.png",
    mapLink: "/pages/map/index.html",
  },
};

function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}

function setText(id: string, value: string): void {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

function setAttr(id: string, attr: string, value: string): void {
  const el = $(id);
  if (el) el.setAttribute(attr, value ?? "");
}

function setIframeSrc(id: string, src: string): void {
  const el = document.getElementById(id) as HTMLIFrameElement;
  if (el) el.src = src ?? "";
}

function clearChildren(el: HTMLElement): void {
  while (el && el.firstChild) el.removeChild(el.firstChild);
}

function updateFacts(d: AnimalData): void {
  if (!d?.facts) return;
  setText("factCommonName", d.facts.commonName);
  setText("factScientificName", d.facts.scientificName);
  setText("factType", d.facts.type);
  setText("factSize", d.facts.size);
  setText("factDiet", d.facts.diet);
  setText("factHabitat", d.facts.habitat);
  setText("factRange", d.facts.range);
  setAttr("mapLink", "href", d.mapLink);
  setAttr("animalSideImg", "src", d.sideImage);
  setAttr("animalSideImg", "alt", d.facts.commonName || "");
}

function setActiveThumb(track: HTMLElement, activeIndex: number): void {
  track.querySelectorAll(".thumb").forEach((t, i) => {
    t.classList.toggle("is-active", i === activeIndex);
  });
}

function renderThumbs(d: AnimalData): void {
  const track = $("thumbTrack");
  if (!track) return;
  clearChildren(track);
  const thumbs = Array.isArray(d.thumbs) ? d.thumbs : [];
  thumbs.forEach((t, index) => {
    const a = document.createElement("a");
    a.className = "thumb" + (index === 0 ? " is-active" : "");
    a.href = "#";
    a.innerHTML = `
      <span class="thumb-tag">
        ${t.tag}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10.0051 10.9923C10.6159 10.9923 11.2128 10.8162 11.7206 10.4863C12.2284 10.1563 12.6242 9.68741 12.8579 9.13877C13.0916 8.59013 13.1527 7.98642 13.0336 7.40398C12.9145 6.82155 12.6204 6.28654 12.1885 5.86663C11.7567 5.44672 11.2065 5.16075 10.6075 5.0449C10.0086 4.92904 9.38772 4.98851 8.8235 5.21576C8.25929 5.44302 7.77704 5.82786 7.43775 6.32162C7.09846 6.81539 6.91737 7.3959 6.91737 7.98975C6.91737 8.78607 7.24268 9.54978 7.82175 10.1129C8.40083 10.676 9.18622 10.9923 10.0051 10.9923Z" fill="white"/>
        </svg>
      </span>
      <div class="thumb-video">
        <iframe src="${t.src}" title="${t.tag}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveThumb(track, index);
      setIframeSrc("mainCam", t.src);
      setText("liveLabel", t.liveLabel || d.liveLabel);
    });
    track.appendChild(a);
  });
}

let currentAnimalKey = "panda";

function setActiveAnimal(animalKey: string): void {
  currentAnimalKey = animalKey;
  const d = data[animalKey];
  if (!d) return;
  document.querySelectorAll(".selected-card").forEach((card) => {
    card.classList.toggle("is-active", (card as HTMLElement).dataset.animal === animalKey);
  });
  setText("zooHeading", d.heading);
  setText("liveLabel", d.liveLabel);
  setIframeSrc("mainCam", d.mainCam);
  setText("bambooTitle", d.bambooTitle);
  setText("bambooText", d.bambooText);
  setText("didTitle", d.didTitle);
  setText("didText", d.didText);
  setText("longText", d.longText);
  updateFacts(d);
  renderThumbs(d);
}

function openMapModal(animalKey: string): void {
  const coords: Record<string, [number, number]> = {
    panda: [30.6, 104.1],
    eagles: [38.9, -77.0],
    gorillas: [-0.2, 15.8],
    lemurs: [-20.0, 47.0],
  };

  const existing = document.getElementById("mapModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "mapModal";
  modal.innerHTML = `
    <div class="map-modal-overlay">
      <div class="map-modal-content">
        <button class="map-modal-close" id="mapModalClose">✕</button>
        <div id="leafletMap" style="width:100%;height:400px;"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  const coord = coords[animalKey] ?? [0, 0];
  // @ts-ignore
  const map = L.map("leafletMap").setView(coord, 5);
  // @ts-ignore
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  // @ts-ignore
  L.marker(coord).addTo(map);

  const closeModal = (): void => {
    modal.remove();
    document.body.style.overflow = "";
  };

  document.getElementById("mapModalClose")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escHandler);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sideNav = document.querySelector<HTMLElement>(".side-nav");
  const toggleBtn = document.querySelector<HTMLElement>("#sideNavToggle");
  if (!sideNav || !toggleBtn) return;

  sideNav.classList.remove("is-open");

  function toggleSideNav(): void {
    if (!sideNav || !toggleBtn) return;
    const isOpen = sideNav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  }

  toggleBtn.addEventListener("click", toggleSideNav);
  toggleBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSideNav();
    }
  });

  document.querySelectorAll(".selected-card").forEach((card) => {
    const key = (card as HTMLElement).dataset.animal;
    card.addEventListener("click", () => { if (key) setActiveAnimal(key); });
    card.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Enter" || (e as KeyboardEvent).key === " ") {
        e.preventDefault();
        if (key) setActiveAnimal(key);
      }
    });
  });

  const defaultCard = document.querySelector<HTMLElement>(".selected-card.is-active");
  setActiveAnimal(defaultCard?.dataset.animal ?? "panda");

  document.querySelector(".viewMap")?.addEventListener("click", () => {
    openMapModal(currentAnimalKey);
  });
});