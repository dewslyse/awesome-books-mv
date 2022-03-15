/* eslint-disable max-classes-per-file */
const addBtn = document.querySelector('.add-btn');
const div = document.querySelector('.added-books');
class Library {
  static library = [];

  static add(book) {
    this.library.push(book);
  }

  static remove(id) {
    Library.library.splice(id - 1, 1);
    const bookToRemove = document.getElementById(`${id}`);
    div.removeChild(bookToRemove);
  }
}

function save() {
  localStorage.setItem('library', JSON.stringify(Library.library));
}

function display(book) {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book');
  bookContainer.id = book.id;
  bookContainer.innerHTML = `
      <ul>
        <li class="item">${book.title}</li>
        <li class="item">${book.author}</li>
      </ul>
      <button class="remove-button" type="button">Remove</button>
      <hr>
      `;
  div.appendChild(bookContainer);
  bookContainer.addEventListener('click', () => {
    Library.remove(book.id);
    save();
  });
}
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addNewBook(title, author) {
    this.title = title;
    this.author = author;
    Library.add(this);
    display(this);
    save();
  }

  removeBook() {
    Library.remove(this);
    save();
  }
}

let i = 0;
addBtn.addEventListener('click', (e) => {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const inputs = document.querySelectorAll('#title, #author');
  e.preventDefault();
  if (bookTitle === '' && bookAuthor === '') {
    alert('Book cannot be empty');
  } else {
    const newBook = new Book(i += 1, bookTitle, bookAuthor);
    newBook.addNewBook(newBook.title, newBook.author);
    save();
  }
  inputs.forEach((input) => {
    input.value = '';
  });
});

window.addEventListener('load', () => {
  const storage = JSON.parse(localStorage.getItem('library'));
  if (storage) {
    for (let j = 0; j < storage.length; j += 1) {
      Library.add(storage[i]);
      display(storage[j]);
    }
  }
});