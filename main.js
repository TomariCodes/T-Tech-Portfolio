const formContainer = document.getElementById("form-container");
fetch("contactForm.html")
  .then((response) => response.text())
  .then((data) => {
    formContainer.innerHTML = data;
  })
  .catch((error) => console.error("Error loading form:", error));

// Modal functionality
const modal = document.getElementById("modal");
const contactButton = document.getElementById("email-link");
const closeButton = document.querySelector(".close-button");

contactButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});
