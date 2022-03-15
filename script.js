const addBtn = document.querySelector('.add-btn');
const div = document.querySelector('.added-books');
// const newBook = {};

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function display(book) {
  const bookContainer = document.createElement('div');
  // bookContainer.classList.add('book');
  bookContainer.innerHTML = `
    <ul>
      <li class="item">${book.title}</li>
      <li class="item">${book.author}</li>
    </ul>
    <button class="remove-button" type="button">Remove</button>
    <hr>
    `;
  div.appendChild(bookContainer);
}

let library = [];
function addNewBook() {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const newBooks = new Book(bookTitle, bookAuthor);
  localStorage.setItem('newBooks', JSON.stringify(newBooks));
  library = JSON.parse(localStorage.getItem('library') || '[]');
  library.push(newBooks);
  localStorage.setItem('library', JSON.stringify(library));
  display(newBooks);
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewBook();
});

window.addEventListener('load', () => {
  const storage = JSON.parse(localStorage.getItem('library'));
  for (let j = 0; j < storage.length; j += 1) {
    display(storage[j]);
  }
});