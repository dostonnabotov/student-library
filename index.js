const table = document.querySelector("[data-table]");
const quantity = document.querySelector("[data-quantity]");

const addForm = document.querySelector("[data-add-form]");
const authorName = addForm.querySelector("#authorName");
const bookName = addForm.querySelector("#bookName");
const description = addForm.querySelector("#description");

const LOCAL_STORAGE_LIBRARY = "student-library.books";

// default library books
let library = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIBRARY)) || [
  {
    authorName: "J.K.Rowling",
    bookName: "Harry Potter and Philosopher's Stone",
    description:
      "a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
    id: "1650975223222",
  },
  {
    authorName: "James Clear",
    bookName: "Atomic Habits",
    description:
      "Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones in four steps",
    id: "1650975327756",
  },
];

// sort elements from array into the table
function sortTable(author, book, description) {
  return {
    authorName: author,
    bookName: book,
    description: description,
    id: Date.now().toString(),
  };
}

// Add new book and push it to the array
function addNewBook() {
  const newAuthorName = authorName.value;
  const newBookName = bookName.value;
  const newDescription = description.value;
  if (newAuthorName == null || newAuthorName === "") return;
  const list = sortTable(newAuthorName, newBookName, newDescription);
  authorName.value = null;
  bookName.value = null;
  description.value = null;
  library.push(list);
}

// Create new table elements and its layout
// Any feedback on how to reduce the lines of code for
// better functionality are very welcome!
function createTableLayout() {
  library.forEach((books) => {
    let tableRow = document.createElement("tr");
    let tableAuthorData = document.createElement("td");
    let tableBookData = document.createElement("td");
    let tableDescriptionData = document.createElement("td");
    let tableIdData = document.createElement("td");
    let modal = document.createElement("dialog");
    tableDescriptionData.appendChild(modal);

    tableDescriptionData.setAttribute("colspan", 2);

    tableAuthorData.innerText = books.authorName;
    tableBookData.innerText = books.bookName;
    tableDescriptionData.innerText = books.description;
    tableIdData.innerText = books.id;

    tableRow.appendChild(tableAuthorData);
    tableRow.appendChild(tableBookData);
    tableRow.appendChild(tableDescriptionData);
    tableRow.appendChild(tableIdData);
    table.appendChild(tableRow);
  });
}

// Clear previous table elements
function clearTable(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Update the quantity
function updateQuantity() {
  quantity.innerText = library.length;
}

// Save data on LOCAL STORAGE
function saveLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_LIBRARY, JSON.stringify(library));
}

// function for running all other functions
function render() {
  clearTable(table);
  createTableLayout();
  updateQuantity();
  saveLocalStorage();
}

// Book add Form handler
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewBook();
  render();
});

// Get Full Year
document.getElementById("year").innerText = new Date().getFullYear();

// Render library books from default array and local storage
render();
