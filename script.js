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
  const book = getBookDetails(inputs);
  library.push(book);
  displayBook(book);
}

function getBookDetails(inputs) {
  return new Book(
    inputs.title.value,
    inputs.author.value,
    inputs.pages.value,
    inputs.read.value
  );
}

function displayBook(book) {
  const newBook = document.createElement("div");
  const bookDetails = document.createElement("div");
  bookDetails.innerText = `Author: ${book.author}
   Pages: ${book.pages} 
   ${book.read ? "Read ✓" : "Not yet read"}`;

  newBook.classList.add("book-card");
  newBook.textContent = `${book.title}`;
  newBook.append(bookDetails);
  bookDisplay.insertAdjacentElement("afterbegin", newBook);
  addListener(newBook);
}

for (let book of library) {
  displayBook(book);
}

// function parseBooks() {
//   for (let book of library) {
//     const newBook = document.createElement("div");
//     newBook.classList.add("book");
//     newBook.textContent = `${book.title} by ${book.author}, ${
//       book.pages
//     } pages, ${book.read ? "read" : "not yet read"}, ${book.rating} `;
//     bookDisplay.insertAdjacentElement("afterbegin", newBook);
//   }
// }

function addListener() {
  const book = document.querySelector(".book-card");
  book.addEventListener("click", showDetails);
}

function showDetails(e) {
  if (!this.classList.contains("expand")) {
    for (child of bookDisplay.children) {
      child.classList.remove("expand");
    }
    this.classList.add("expand");
  } else {
    this.classList.remove("expand");
  }
}
