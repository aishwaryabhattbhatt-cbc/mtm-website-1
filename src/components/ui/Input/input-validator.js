// src/components/ui/InputField/input-validator.js

export function initInputValidation(root) {
    const input = root.querySelector(".input-control");
    const helper = root.querySelector(".input-helper");
    const errorText = root.querySelector(".input-error-text");
  
    const validateType = root.dataset.validate; // "email" | ""
    const errorMessage =
      root.dataset.errorMessage || "Please enter a valid value";
  
    const isValidEmail = (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  
    const clearState = () => {
      root.classList.remove("has-error", "has-success");
      input.setAttribute("aria-invalid", "false");
      helper.classList.remove("is-visible");
      errorText.textContent = "";
    };
  
    const setError = () => {
      root.classList.add("has-error");
      root.classList.remove("has-success");
      input.setAttribute("aria-invalid", "true");
      helper.classList.add("is-visible");
      errorText.textContent = errorMessage;
    };
  
    const setSuccess = () => {
      root.classList.remove("has-error");
      root.classList.add("has-success");
      input.setAttribute("aria-invalid", "false");
      helper.classList.remove("is-visible");
      errorText.textContent = "";
    };
  
    const validate = () => {
      const value = input.value.trim();
  
      // Empty field = neutral (unless required on blur)
      if (!value) {
        clearState();
        return;
      }
  
      if (validateType === "email") {
        return isValidEmail(value) ? setSuccess() : setError();
      }
  
      // non-email inputs default to neutral
      clearState();
    };
  
    input.addEventListener("input", validate);
  
    input.addEventListener("blur", () => {
      if (input.required && !input.value.trim()) {
        setError();
        return;
      }
      validate();
    });
  }
  