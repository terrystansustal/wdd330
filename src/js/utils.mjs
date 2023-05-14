// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
// export function setLocalStorage(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }
export function setLocalStorage(key, data) {
  // Save data currently in local storage
  let currentData = localStorage.getItem(key);
  console.log(currentData);

  // If there is no data, current data is an empty array
  if (!currentData) {
    currentData = [];
  } else {
    // If there is data, it is parsed into a JavaScript array
    currentData = JSON.parse(currentData);

    // Check if parsed data is an array. If not, current data is an empty array
    if (!Array.isArray(currentData)) {
      currentData = [];
    }
  }

  // New data is appended to the current data
  currentData.push(data);

  // Store the updated array back in local storage
  localStorage.setItem(key, JSON.stringify(currentData));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
