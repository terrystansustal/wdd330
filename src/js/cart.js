import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // console.log(cartItems);
  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const htmlItems = cartItemTemplate(cartItems);
  // console.log(htmlItems);
  // document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".product-list").insertAdjacentHTML("beforeend", htmlItems);
  // document.querySelector(".product-list").append(htmlItems);
}

function cartItemTemplate(item) {
  // console.log(item.FinalPrice);
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
cartFooter.classList.add("cart-footer");

// Create cart total element
const cartTotal = document.createElement("p");
cartTotal.classList.add("cart-total");
cartTotal.textContent = "Total: ";

// Append cart total element to cart footer element
cartFooter.appendChild(cartTotal);

// Append cart footer element to the DOM
const cartContainer = document.querySelector(".divider");
cartContainer.appendChild(cartFooter);

// Get cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Check if cart is empty
if (cartItems.length === 0) {
  cartFooter.classList.add("hide");
  const emptyCartMessage = document.createElement("p");
  emptyCartMessage.textContent = "Your cart is empty.";
  cartFooter.appendChild(emptyCartMessage);
}
else
{ // Handle non-empty cart here, for example:
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
