// cart count
const cartKey = "cozyNookCartCount";
let cartCount = Number(localStorage.getItem(cartKey)) || 0;

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach(function (count) {
    count.textContent = cartCount;
  });
  document.querySelectorAll(".cart-display").forEach(function (cart) {
    cart.setAttribute("aria-label", "Cart, " + cartCount + " items");
  });
}

updateCartCount();

document.querySelectorAll(".add-button, .order-button").forEach(function (button) {
  button.addEventListener("click", function () {
    cartCount += 1;
    localStorage.setItem(cartKey, cartCount);
    updateCartCount();
  });
});

const cartButton = document.querySelector("#cart-button");
const cartModal = document.querySelector("#cart-modal");
const cartMessage = document.querySelector("#cart-message");
const cartActions = document.querySelector("#cart-actions");

function resetCart() {
  cartCount = 0;
  localStorage.setItem(cartKey, cartCount);
  updateCartCount();
}

cartButton.addEventListener("click", function () {
  cartActions.hidden = false;

  if (cartCount === 0) {
    cartMessage.textContent = "Your cart is empty.";
  } else {
    cartMessage.textContent =
      "You have " + cartCount + " item(s) in your cart.";
  }

  cartModal.hidden = false;
});

document.querySelector("#close-cart").addEventListener("click", function () {
  cartModal.hidden = true;
});

document.querySelector("#cancel-order-button").addEventListener("click", function () {
  resetCart();
  cartModal.hidden = true;
});

document.querySelector("#checkout-button").addEventListener("click", function () {
  if (cartCount === 0) {
    cartMessage.textContent = "Your cart is empty.";
    return;
  }

  resetCart();
  cartMessage.textContent = "Checkout complete!";
  cartActions.hidden = true;
});

// furniture category
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");
      filterButton.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    document.querySelectorAll(".product-category").forEach(function (section) {
      const matches = selectedCategory === "all" || section.dataset.categorySection === selectedCategory;
      section.hidden = !matches;
    });
  });
});

// contact form to
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");
    const status = document.querySelector("#form-status");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fields = [name, email, message];
    let firstInvalidField = null;

    fields.forEach(function (field) {
      const error = document.querySelector("#" + field.id + "-error");
      error.textContent = "";
      field.removeAttribute("aria-invalid");
    });
    status.textContent = "";

    if (name.value.trim() === "") {
      document.querySelector("#name-error").textContent = "Please enter your name.";
      firstInvalidField = name;
    }
    if (!emailPattern.test(email.value.trim())) {
      document.querySelector("#email-error").textContent = "Please enter a valid email address.";
      if (!firstInvalidField) firstInvalidField = email;
    }
    if (message.value.trim() === "") {
      document.querySelector("#message-error").textContent = "Please type your message.";
      if (!firstInvalidField) firstInvalidField = message;
    }

    if (firstInvalidField) {
      fields.forEach(function (field) {
        const error = document.querySelector("#" + field.id + "-error");
        if (error.textContent) field.setAttribute("aria-invalid", "true");
      });
      firstInvalidField.focus();
      return;
    }

    status.textContent = "Thank you, " + name.value.trim() + "! Your message has been received.";
    contactForm.reset();
  });
}
