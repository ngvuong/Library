let library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: false,
    recommended: null,
  },
];

function Book() {
  title = this.title;
  author = this.author;
  pageTotal = this.pages;
  isRead = this.read;
  recommended = this.recommended;
}

const book1 = new Book();
book1.title = "Test";
library.push(book1);

const addBtn = document.querySelector("#add-book");
addBtn.addEventListener("click", displayForm);

const formOverlay = document.querySelector("#form-overlay");
function displayForm() {
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#title");
  const pagesInput = document.querySelector("#title");
  const readInput = document.querySelector("#title");
  const recommendInput = document.querySelector("#title");
  formOverlay.style.display = "flex";
  titleInput.focus();
  document.querySelector(".book-details").addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
    addBook(e);
    closeForm(e);
  });
}

// Closing form
const closeX = document.querySelector("#close");
formOverlay.addEventListener("keyup", closeForm);
closeX.addEventListener("click", closeForm);

function closeForm(e) {
  if (e.key === "Escape" || e.type === "click" || e.type === "submit") {
    formOverlay.style.display = "none";
  }
}

function addBook(e) {
  const book = new Book();
  const inputElements = e.target.elements;
  book.title = inputElements.title.value;
  book.author = e.target.elements.author.value;
  book.pages = e.target.elements.pages.value;
  book.read = e.target.elements.read.value;
  book.recommended = e.target.elements.recommended.value;
  library.push(book);
  displayBooks();
}

function displayBooks() {
  const bookList = document.querySelector(".book-list");
  bookList.textContent = "";
  library.forEach((book) => {
    const newBook = document.createElement("li");
    newBook.textContent = `${book.title} by ${book.author}, ${
      book.pageTotal
    }, ${book.isRead ? "read" : "not yet read"}, ${book.recommended} `;
    bookList.appendChild(newBook);
  });
}

displayBooks();
