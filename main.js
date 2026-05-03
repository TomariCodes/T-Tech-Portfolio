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

// Form submission handling
document.addEventListener("submit", async (event) => {
  if (event.target.tagName === "FORM") {
    event.preventDefault();
    const form = event.target;

    if (!form.reportValidity()) return;

    const firstName = form.querySelector("#firstname").value.trim();
    const lastName = form.querySelector("#lastname").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    const formData = new FormData(form);
    formData.delete("firstname");
    formData.delete("lastname");
    formData.set("name", `${firstName} ${lastName}`);
    formData.append("access_key", "b0b2c6b5-053b-4d1e-8e7f-26dc29867d18");

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData,
      },
    );
    console.log("WEB3 RESPONSE:", response);
    const text = await response.text();
    console.log("WEB3 RESPONSE:", text);
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      console.error("RAW RESPONSE:", text);
      alert("Server error -- Check console");
      return;
    }

    if (result.success) {
      form.reset();
      modal.style.display = "none";
    }
  }
});
