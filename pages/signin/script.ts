import { initHeader } from "../../src/utils/header";
import { loginUser } from "../../src/api/api";

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


const loginInput = document.getElementById("loginInput") as HTMLInputElement;
const passwordInput = document.getElementById("passwordInput",) as HTMLInputElement;
const loginError = document.getElementById("loginError");
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");
const signinBtn = document.getElementById("signinBtn") as HTMLButtonElement;

function validateLogin(value: string): string {
  if (value.length < 3) return "Login must be at least 3 characters";
  if (!/^[a-zA-Z]/.test(value)) return "Login must start with a letter";
  if (!/^[a-zA-Z]+$/.test(value))
    return "Login must contain only English letters";
  return "";
}

function validatePassword(value: string): string {
  if (value.length < 6) return "Password must be at least 6 characters";
  if (!/[^a-zA-Z0-9]/.test(value))
    return "Password must contain at least 1 special character";
  return "";
}

function checkForm(): void {
  const loginVal = validateLogin(loginInput.value);
  const passVal = validatePassword(passwordInput.value);
  signinBtn.disabled = loginVal !== "" || passVal !== "";
}

loginInput.addEventListener("blur", () => {
  const error = validateLogin(loginInput.value);
  if (loginError) loginError.textContent = error;
  loginInput.classList.toggle("invalid", error !== "");
  checkForm();
});

loginInput.addEventListener("focus", () => {
  if (loginError) loginError.textContent = "";
  loginInput.classList.remove("invalid");
});

passwordInput.addEventListener("blur", () => {
  const error = validatePassword(passwordInput.value);
  if (passwordError) passwordError.textContent = error;
  passwordInput.classList.toggle("invalid", error !== "");
  checkForm();
});

passwordInput.addEventListener("focus", () => {
  if (passwordError) passwordError.textContent = "";
  passwordInput.classList.remove("invalid");
});

loginInput.addEventListener("input", checkForm);
passwordInput.addEventListener("input", checkForm);

signinBtn.addEventListener("click", async () => {
  if (formError) formError.textContent = "";

  try {
    const response = await loginUser({
      login: loginInput.value,
      password: passwordInput.value,
    });
    console.log(response);
    localStorage.setItem("token", response.data.access_token);
    window.location.href = "../landing/index.html";
  } catch {
    if (formError) formError.textContent = "Incorrect login or password";
  }
});
