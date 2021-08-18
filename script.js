let library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pageTotal: 295,
    isRead: false,
    recommended: null,
  },
];

const Book = {
  title: this.title,
  author: this.author,
  pageTotal: this.pages,
  isRead: this.read,
  recommended: this.recommended,
};

const book1 = Object.create(Book);
book1.title = "Test";
library.push(book1);

const addBtn = document.querySelector("#add-book");
addBtn.addEventListener("click", displayForm);

const formOverlay = document.querySelector("#form-overlay");
function displayForm() {
  formOverlay.style.display = "flex";
  const titleInput = document.querySelector("#title");
  titleInput.focus();
  document.querySelector(".book-details").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(titleInput.value);
    addBook(titleInput.value);
    off(e);
  });
}

formOverlay.addEventListener("keyup", off);
const closeX = document.querySelector("#close");
closeX.addEventListener("click", off);
function off(e) {
  if (e.key === "Escape" || e.type === "click" || e.type === "submit") {
    formOverlay.style.display = "none";
  }
}

function addBook(title) {
  const book = Object.create(Book);
  book.title = title;
  library.push(book);
  displayBooks();
}

const bookList = document.querySelector(".book-list");
function displayBooks() {
  bookList.textContent = "";
  library.forEach((book) => {
    const newBook = document.createElement("li");
    newBook.textContent = `${book.title} by ${book.author}`;
    bookList.appendChild(newBook);
  });
}

displayBooks();
