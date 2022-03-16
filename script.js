/* eslint-disable max-classes-per-file */
const addBtn = document.querySelector('.add-btn');
const div = document.querySelector('.added-books');
const contact = document.querySelector('.contact');
const contactLink = document.querySelector('.contact-link');
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
      <div class="book-item">
        <p class="item">"${book.title}" by ${book.author}</p>
        <button class="remove-button" type="button">Remove</button>        
      </div>
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
      Library.add(storage[j]);
      display(storage[j]);
    }
  }
});

contactLink.addEventListener('click', () => {
  const contactDiv = document.createElement('div');
  contactDiv.innerHTML = `
      <h2>Contact Information</h2>
      <div class="contact-text">
      <p>Do you have any questions or you just want to say 'Hello".</p>
      <p>You can reach out to us!</p>
      </div>
      <ul class="contact-features">
        <li>Our email: info@awesomebooks.com</li>
        <li>Our phone number: 0043586534422</li>
        <li>Our address: 22 Microverse st., 84503 Universe</li>
      </ul>
    `;
  contact.appendChild(contactDiv);
});