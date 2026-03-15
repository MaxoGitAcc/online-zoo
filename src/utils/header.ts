import { getUserProfile } from "../api/api";

export async function initHeader(): Promise<void> {
  const userBtn = document.getElementById("userBtn");
  const userPopup = document.getElementById("userPopup");
  const userBtnName = document.getElementById("userBtnName");
  if (!userBtn || !userPopup || !userBtnName) return;

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