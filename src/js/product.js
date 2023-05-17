import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // console.log(product);
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  // remove from cart button event handler
async function removeFromCartHandler(e) {
  // const product = await findProductById(e.target.dataset.id);
  // addProductToCart(product);
  if (e.target.classList.contains("cart-card")) {
    console.log("Delete!")
  }
}

// add listener to Remove from Cart button
document
  .getElementById("productList")
  .addEventListener("click", removeFromCartHandler);