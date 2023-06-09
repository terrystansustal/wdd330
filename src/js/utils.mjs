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
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// export function setLocalStorage(key, data) {
//   // Save data currently in local storage
//   let currentData = localStorage.getItem(key);
//   console.log(currentData);

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

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

export async function renderListWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  
  return async function () {
    const response = await fetch(path);

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      const html = await response.text();
      return html;
    }    
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const mainHeader = document.querySelector("#main-header");
  const mainFooter = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, mainHeader);
  renderWithTemplate(footerTemplateFn, mainFooter);
}