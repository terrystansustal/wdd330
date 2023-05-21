import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// import { findProductById } from "./productData.mjs";

loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

// // add to cart butteon event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click",
//     addToCartHandler
// );