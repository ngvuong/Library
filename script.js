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
  title: title,
  author: author,
  pageTotal: pages,
  isRead: read,
  recommended: recommended,
};

const book1 = Object.create(Book);
book1.title = "Test";
function addBook() {
  const book = prompt("Enter book to add");
  console.log(book);
}
