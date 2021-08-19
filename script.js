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

const book1 = new Book();
book1.title = "Test";
book2 = new Book("I", "me", 321, true);
library.push(book1, book2);

const addBookBtn = document.querySelector(".add-book");
const formOverlay = document.querySelector(".form-overlay");
const bookForm = document.querySelector(".form");
const bookDisplay = document.querySelector(".book-display");
// const xClose = document.querySelector("#close");

addBookBtn.addEventListener("click", displayForm);

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
  formOverlay.classList.add("active");
  document.querySelector("#title").focus();
}

function closeForm(e) {
  console.log(e);
  if (e.type === "click" || e.type === "submit" || e.key === "Escape") {
    formOverlay.classList.remove("active");
    bookForm.reset();
  }
}

function addBook(e) {
  const inputs = e.target.elements;
  const { title, author, pages, read } = getBookDetails(inputs);
  const book = new Book(title, author, pages, read);
  library.push(book);
  displayBooks(book);
}

function getBookDetails(inputs) {
  return {
    title: inputs.title.value,
    author: inputs.author.value,
    pages: inputs.pages.value,
    read: inputs.read.value,
  };
}

function displayBooks(book) {
  // bookDisplay.textContent = "";
  // parseBooks();
  const newBook = document.createElement("div");
  newBook.classList.add("book");
  newBook.textContent = `${book.title} by ${book.author}, ${
    book.pages
  } pages, ${book.read ? "read" : "not yet read"}, ${book.rating} `;
  bookDisplay.insertAdjacentElement("afterbegin", newBook);
  addListener(newBook);
}

for (let book of library) {
  displayBooks(book);
  addListener(book);
}

function parseBooks() {
  for (let book of library) {
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    newBook.textContent = `${book.title} by ${book.author}, ${
      book.pages
    } pages, ${book.read ? "read" : "not yet read"}, ${book.rating} `;
    bookDisplay.insertAdjacentElement("afterbegin", newBook);
  }
}

function addListener() {
  const book = document.querySelector(".book");
  book.addEventListener("click", showDetails);
}

function showDetails(e) {
  bookDisplay.classList.add("flag");
  e.target.classList.toggle("expand");
}
