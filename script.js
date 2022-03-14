const addBtn = document.querySelector('.add-btn');
// const newBook = {};

function Book(title, author) {
  this.title = title;
  this.author = author;
}
let awesomeBooks = [];
function addNewBook() {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const newBooks = new Book(bookTitle, bookAuthor);
  localStorage.setItem('book', JSON.stringify(newBooks));
  awesomeBooks.push(newBooks);
  // localStorage.setItem('book', JSON.stringify(newBooks));
  // awesomeBooks = JSON.parse(newBooks);
  console.log(awesomeBooks);
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewBook();
});
