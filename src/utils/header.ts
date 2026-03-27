import { getUserProfile } from "../api/api";
import { getSavedTheme, toggleTheme } from "./theme";

export async function initHeader(): Promise<void> {
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    // Apply saved theme on load (no textContent overwrite)
    const currentTheme = getSavedTheme();
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.setAttribute("aria-pressed", "true");
    }

    themeToggle.addEventListener("click", () => {
      toggleTheme();
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  // User popup
  const userBtn = document.getElementById("userBtn");
  const userPopup = document.getElementById("userPopup");
  const userBtnName = document.getElementById("userBtnName");

  if (userBtn && userPopup && userBtnName) {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const profile = await getUserProfile();
        userBtnName.textContent = profile.name;
        userPopup.innerHTML = `
          <p><strong>${profile.name}</strong></p>
          <p>${profile.email}</p>
          <button id="signOutBtn">Sign Out</button>
        `;

        document.getElementById("signOutBtn")?.addEventListener("click", () => {
          localStorage.removeItem("token");
          window.location.reload();
        });
      } catch {
        localStorage.removeItem("token");
      }
    } else {
      userPopup.innerHTML = `
        <a href="/pages/signin/index.html">Sign In</a>
        <a href="/pages/register/index.html">Registration</a>
      `;
    }

    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userPopup.hidden = !userPopup.hidden;
    });

    document.addEventListener("click", () => {
      userPopup.hidden = true;
    });
  }

  // Hamburger
  const hamburger = document.getElementById("hamburgerBtn");
  const rightSide = document.getElementById("rightSide");

  if (hamburger && rightSide) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      rightSide.classList.toggle("nav-open");
      document.body.style.overflow = rightSide.classList.contains("nav-open")
        ? "hidden"
        : "";
    });

    rightSide.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        rightSide.classList.remove("nav-open");
        document.body.style.overflow = "";
      });
    });
  }
}