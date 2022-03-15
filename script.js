const addBtn = document.querySelector('.add-btn');
const div = document.querySelector('.added-books');
const library = [];

function save() {
  localStorage.setItem('library', JSON.stringify(library));
}

function removeBook(id) {
  const bookToRemove = document.getElementById(`${id}`);
  div.removeChild(bookToRemove);
  library.splice(id, 1);
  save();
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
    removeBook(book.id);
    save();
  });
}

let book = {};
function addNewBook(title, author) {
  book = {
    id: String(library.length),
    title,
    author,
  };
  library.push(book);
  display(book);
  save();
}

addBtn.addEventListener('click', (e) => {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const inputs = document.querySelectorAll('#title, #author');
  e.preventDefault();
  if (bookTitle === '' && bookAuthor === '') {
    console.log('Book cannot be empty');
  } else {
    addNewBook(bookTitle, bookAuthor);
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
      display(storage[j]);
    }
  }
});