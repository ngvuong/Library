// Library: book storage
let library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: false,
  },
];

// Book constructor
function Book(title, author, pages, read, rating = null) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const book1 = new Book("The Martian", "Andy Weir", 200, true, 5);
book2 = new Book("I", "me", 321, true);
library.push(book1, book2);

const addBookBtn = document.querySelector(".btn-add-book");
const formOverlay = document.querySelector(".form-overlay");
const bookForm = document.querySelector(".form");
const bookDisplay = document.querySelector(".book-display");

addBookBtn.addEventListener("click", displayForm);

document.querySelector(".cancel").addEventListener("click", closeForm);

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addBook(e);
  closeForm(e);
});

// Closing form
formOverlay.addEventListener("keydown", closeForm);

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
  setBookDetails(book, bookDetails);

  return bookDetails;
}

function setBookDetails(book, details) {
  const removeBtn = document.createElement("button");
  const readToggle = setReadToggle();

  removeBtn.classList.add("btn-remove-book", "btn");
  removeBtn.textContent = "Remove Book";
  removeBtn.addEventListener("click", () => removeBook(book));

  readToggle.firstChild.checked = book.read ? true : false;
  readToggle.firstChild.addEventListener("change", () => {
    book.toggleRead();
    setBookDetails(book, details);
  });

  details.innerText = `${book.author}
   ${book.pages} pages 
   ${book.read ? "Read ✓  " : "Not read"}`;
  details.append(readToggle, removeBtn);
}

function setReadToggle() {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");
  label.classList.add("toggle-read", "card");
  input.type = "checkbox";
  span.classList.add("slider");
  label.append(input, span);

  return label;
}

function refreshDisplay() {
  bookDisplay.textContent = "";
  for (let book of library) {
    displayBook(book);
  }
}
refreshDisplay();

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

function checkStorage(type) {
  let storage;
  try {
    storage = window[type];
    let x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
}

const storage = window.localStorage;
if (checkStorage("localStorage")) {
  library.forEach((book, i) => {
    storage.setItem(i + 1, JSON.stringify(book));
  });
  console.log(storage);
} else {
  console.log("no");
}
