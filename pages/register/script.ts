import { initHeader } from "../../src/utils/header";
import { registerUser } from "../../src/api/api";

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

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const loginInput = document.getElementById("loginInput") as HTMLInputElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
const confirmPasswordInput = document.getElementById("confirmPasswordInput") as HTMLInputElement;
const nameError = document.getElementById("nameError");
const loginError = document.getElementById("loginError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const formError = document.getElementById("formError");
const registerBtn = document.getElementById("registerBtn") as HTMLButtonElement;

function validateName(value: string): string {
  if (value.length < 3) return "Name must be at least 3 characters";
  if (!/^[a-zA-Z]+$/.test(value)) return "Name must contain only English letters";
  return "";
}

function validateLogin(value: string): string {
  if (value.length < 3) return "Login must be at least 3 characters";
  if (!/^[a-zA-Z]/.test(value)) return "Login must start with a letter";
  if (!/^[a-zA-Z]+$/.test(value)) return "Login must contain only English letters";
  return "";
}

function validateEmail(value: string): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
  return "";
}

function validatePassword(value: string): string {
  if (value.length < 6) return "Password must be at least 6 characters";
  if (!/[^a-zA-Z0-9]/.test(value)) return "Password must contain at least 1 special character";
  return "";
}

function validateConfirmPassword(value: string): string {
  if (value !== passwordInput.value) return "Passwords do not match";
  return "";
}

function checkForm(): void {
  const nameVal = validateName(nameInput.value);
  const loginVal = validateLogin(loginInput.value);
  const emailVal = validateEmail(emailInput.value);
  const passVal = validatePassword(passwordInput.value);
  const confirmVal = validateConfirmPassword(confirmPasswordInput.value);
  registerBtn.disabled = nameVal !== "" || loginVal !== "" || emailVal !== "" || passVal !== "" || confirmVal !== "";
}

function setupField(input: HTMLInputElement, errorEl: HTMLElement | null, validateFn: (v: string) => string): void {
  input.addEventListener("blur", () => {
    const error = validateFn(input.value);
    if (errorEl) errorEl.textContent = error;
    input.classList.toggle("invalid", error !== "");
    checkForm();
  });
  input.addEventListener("focus", () => {
    if (errorEl) errorEl.textContent = "";
    input.classList.remove("invalid");
  });
  input.addEventListener("input", checkForm);
}

setupField(nameInput, nameError, validateName);
setupField(loginInput, loginError, validateLogin);
setupField(emailInput, emailError, validateEmail);
setupField(passwordInput, passwordError, validatePassword);
setupField(confirmPasswordInput, confirmPasswordError, validateConfirmPassword);

registerBtn.addEventListener("click", async () => {
  if (formError) formError.textContent = "";
  try {
    await registerUser({
      name: nameInput.value,
      login: loginInput.value,
      password: passwordInput.value,
      email: emailInput.value,
    });
    window.location.href = "../signin/index.html";
  } catch (error) {
    if (formError) formError.textContent = error instanceof Error ? error.message : "Registration failed";
  }
});