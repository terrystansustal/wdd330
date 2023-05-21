import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");

  outputEl.addEventListener("click", function(el) {
    if (el.target.classList.contains("cart-delete")) {
      // Remove item from cart
      el.target.parentElement.remove();
      
      // Store item data id
      const delItemId = el.target.getAttribute("data-id");

      // Remove item from local storage
      removeFromCart("so-cart", delItemId);

    }
  });

  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Update the count element with the total number of items
  document.getElementById("count").innerHTML = totalItems.toString();
}

function removeFromCart(storageId, delItemId) {
  // Grab items from local storage
  let cartContents = localStorage.getItem(storageId);
  
  // Parse items into an array
  if (cartContents) {
    cartContents = JSON.parse(cartContents);
    
    // Get the index of the item being deleted
    if(Array.isArray(cartContents)) {
      const idx = cartContents.findIndex(item => item.Id === delItemId);
      
      // If item is in array, remove it
      if (idx !== -1) {
        cartContents.splice(idx, 1);
      }

      // Clear local storage contents
      localStorage.clear();
      
      // Set local storage to current cart contents
      localStorage.setItem(storageId, JSON.stringify(cartContents));
    }
  }
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
  <span class="cart-delete" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}