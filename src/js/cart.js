import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItemTemplate(cartItems);
  document.querySelector(".product-list").innerHTML = htmlItems;
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();



//TOTAL IN CART//

// Create cart footer element
const cartFooter = document.createElement("div");
cartFooter.classList.add("cart-footer", "hide");

// Create cart total element
const cartTotal = document.createElement("p");
cartTotal.classList.add("cart-total");
cartTotal.textContent = "Total: ";

// Append cart total element to cart footer
cartFooter.appendChild(cartTotal);

// Add cart footer to cart page
const cartPage = document.querySelector(".products");
cartPage.appendChild(cartFooter);
// Get cart items from local storage
const localItems = getLocalStorage("so-cart");

console.log(getLocalStorage("so-cart"))

// Check if cart is empty
if (localItems.length === 0) {
  // Handle empty cart
  cartFooter.classList.add("hide");
  const emptyCartMessage = document.createElement("p");
  emptyCartMessage.textContent = "Your cart is empty.";
  cartFooter.appendChild(emptyCartMessage);
} else {
  // Handle non-empty cart
  cartFooter.classList.remove("hide");
  let total = 0;

  localItems.forEach(item => {
    total += item.FinalPrice * item.quantity;
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
