const addBtn = document.querySelector('.add-btn');
const div = document.querySelector('.added-books');
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
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book');
  bookContainer.innerHTML = `
  <ul>
    <li class="item">${newBooks.title}</li>
    <li class="item">${newBooks.author}</li>
  </ul>
  <button class="remove-button" type="button">Remove</button>
  <hr>
  `;
  div.appendChild(bookContainer);
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewBook();
});


