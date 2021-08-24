// Library: book storage
let library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: false,
    rating: null,
  },
];

// Book constructor
function Book(title, author, pages, read, rating = null) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.rating = rating;
}

const book1 = new Book("The Martian", "Andy Weir", 200, true, 5);
book2 = new Book("I", "me", 321, true);
library.push(book1, book2);

const addBookBtn = document.querySelector(".btn-add-book");
const formOverlay = document.querySelector(".form-overlay");
const bookForm = document.querySelector(".form");
const bookDisplay = document.querySelector(".book-display");
// const xClose = document.querySelector("#close");

addBookBtn.addEventListener("click", displayForm);

document.querySelector(".cancel").addEventListener("click", closeForm);

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addBook(e);
  closeForm(e);
});

// Closing form
formOverlay.addEventListener("keydown", closeForm);
// xClose.addEventListener("click", closeForm);

formOverlay.addEventListener("click", (e) => {
  closeForm(e);
});
bookForm.addEventListener("click", (e) => {
  e.stopPropagation();
});

function displayForm() {
  collapseShelf();
  formOverlay.classList.add("active");
  document.querySelector("#title").focus();
}

function closeForm(e) {
  if (e.type === "click" || e.type === "submit" || e.key === "Escape") {
    formOverlay.classList.remove("active");
    bookForm.reset();
  }
}

function addBook(e) {
  const inputs = e.target.elements;
  const book = getBookDetails(inputs);
  library.push(book);
  displayBook(book);
}

function getBookDetails(inputs) {
  return new Book(
    inputs.title.value,
    inputs.author.value,
    inputs.pages.value,
    inputs.read.checked
  );
}

function displayBook(book) {
  const title = setStackDisplay(book);
  const details = setExpandDisplay(book);
  const newBook = document.createElement("div");
  newBook.classList.add("book-card");
  newBook.append(title, details);
  bookDisplay.insertAdjacentElement("afterbegin", newBook);
  newBook.addEventListener("click", showDetails);
}

function setStackDisplay(book) {
  const title = document.createElement("div");
  title.textContent = `${book.title}`;
  return title;
}

function setExpandDisplay(book) {
  const bookDetails = document.createElement("div");
  const removeBtn = document.createElement("button");
  removeBtn.addEventListener("click", () => removeBook(book));
  removeBtn.textContent = "Remove Book";
  removeBtn.classList.add("btn-remove-book", "btn");
  bookDetails.innerText = `${book.author}
   ${book.pages} pages 
   ${book.read ? "Read ✓" : "Not read"}`;
  bookDetails.append(removeBtn);
  return bookDetails;
}

for (let book of library) {
  displayBook(book);
}

function showDetails() {
  if (!this.classList.contains("expand")) {
    collapseShelf();
    this.classList.add("expand");
  } else {
    this.classList.remove("expand");
  }
  this.scrollIntoView();
}

function collapseShelf() {
  for (child of bookDisplay.children) {
    child.classList.remove("expand");
  }
}

function removeBook(book) {
  const bookNode = document.querySelector(".expand");
  bookDisplay.removeChild(bookNode);
  library.splice(library.indexOf(book), 1);
}
