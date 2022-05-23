// Add Form Elements
const form_add = document.querySelector(".form-add");
const author = form_add.querySelector("#author");
const book = form_add.querySelector("#book");

// Search Form elements
const form_search = document.querySelector(".form-search");
const search = form_search.querySelector("#search");
const search_output = form_search.querySelector("#search-output");

const tbody = document.querySelector("tbody");
const quantity = document.querySelector("#quantity");

function add_book(e) {
  e.preventDefault();
  tbody.innerHTML += `
          <tr>
            <td>${author.value}</td>
            <td>${book.value}</td>
            <td>${Math.floor(Math.random() * 1000) + 1}</td>
            <td>
              <button class="delete-btn" onclick="delete_btn(this)">Delete</button>
            </td>
          </tr>
        `;
  author.value = null;
  book.value = null;

  updateQuantity();
}

function updateQuantity() {
  const tr = tbody.getElementsByTagName("TR");
  quantity.innerText = tr.length;
}

// delete its closest ancestor, which is <tr> tag
function delete_btn(element) {
  element.closest("tr").remove();
  updateQuantity();
}

function search_book(e) {
  e.preventDefault();
  const td = tbody.getElementsByTagName("TD");

  if (td.length != 0) {
    search_output.innerText = "";

    for (let i = 0; i < td.length; i++) {
      if (td.item(i).outerText === search.value) {
        search_output.innerText = `Found!`;
      }
    }
  } else {
    search_output.innerText = `Library is empty!`;
  }
}

form_add.addEventListener("submit", add_book);
form_search.addEventListener("submit", search_book);

// Get Full Year
// document.getElementById("year").innerText = new Date().getFullYear();
