// join.js

// ✅ Set timestamp when form loads
window.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();
  }
});

// ✅ Modal logic
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const openButtons = document.querySelectorAll(".open-modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  // Open modal
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.getAttribute("data-target"));
      if (target) {
        target.style.display = "block";
      }
    });
  });

  // Close modal
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
