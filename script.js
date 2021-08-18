// Library: book storage
let library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: false,
    recommended: null,
  },
];

// Book constructor
function Book() {
  title = this.title;
  author = this.author;
  pages = this.pages;
  read = this.read;
  recommended = this.recommended;
}

const book1 = new Book();
book1.title = "Test";
library.push(book1);

// Add new book form
const formOverlay = document.querySelector(".form-overlay");
const bookForm = document.querySelector(".form");

document.querySelector(".add-book").addEventListener("click", displayForm);

function displayForm() {
  formOverlay.classList.add("active");
  document.querySelector("#title").focus();
  // document.querySelector("#read").addEventListener("click", () => {
  //   document.querySelector(".recommend").style.display = "block";
  // });
  // document.querySelector("#not-read").addEventListener("click", () => {
  //   document.querySelector(".recommend").style.display = "none";
  // });
}

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addBook(e);
  closeForm(e);
  console.log(e);
});

// Closing form
const closeX = document.querySelector("#close");
formOverlay.addEventListener("keydown", closeForm);
closeX.addEventListener("click", closeForm);

function closeForm(e) {
  if (e.type === "click" || e.type === "submit" || e.key === "Escape") {
    formOverlay.classList.remove("active");
    bookForm.reset();
  }
}

function addBook(e) {
  const book = new Book();
  const inputElements = e.target.elements;
  book.title = inputElements.title.value;
  book.author = inputElements.author.value;
  book.pages = inputElements.pages.value;
  book.read = inputElements.read.value;
  // book.recommended = inputElements.recommended.value;
  library.push(book);
  displayBooks();
}

function displayBooks() {
  const bookList = document.querySelector(".book-list");
  bookList.textContent = "";
  library.forEach((book) => {
    const newBook = document.createElement("li");
    newBook.textContent = `${book.title} by ${book.author}, ${book.pages}, ${
      book.read ? "read" : "not yet read"
    }, ${book.recommended} `;
    bookList.append(newBook);
  });
}

displayBooks();
