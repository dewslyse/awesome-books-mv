const addBtn = document.querySelector('.add-btn');
const div = document.querySelector('.added-books');
const library = [];
function save() {
  localStorage.setItem('library', JSON.stringify(library));
}

function removeBook(id) {
  const bookToRemove = document.getElementById(`${id}`);
  div.removeChild(bookToRemove);
  console.log(library);
  library.splice(id - 1, 1);
  console.log(library);
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
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addNewBook(newBook) {
    library.push(newBook);
    display(newBook);
    save();
  }
}

// let book = {};
// let i = 0;
// function addNewBook(title, author) {
//   book = {
//     id: i += 1,
//     title,
//     author,
//   };
//   library.push(book);
//   display(book);
//   save();
// }
let i = 0;
addBtn.addEventListener('click', (e) => {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const inputs = document.querySelectorAll('#title, #author');
  e.preventDefault();
  if (bookTitle === '' && bookAuthor === '') {
    alert('Book cannot be empty');
  } else {
    // addNewBook(bookTitle, bookAuthor);
    const newBook = new Book(i += 1, bookTitle, bookAuthor);
    console.log(newBook);
    newBook.addNewBook(newBook);
    save();
  }
  inputs.forEach((input) => {
    input.value = '';
  });
});

window.addEventListener('load', () => {
  // const storage = JSON.parse(localStorage.getItem('library'));
  // if (storage) {
  //   for (let j = 0; j < storage.length; j += 1) {
  //     addNewBook(storage[j].title, storage[j].author);
  //   }
  //   console.log(storage);
  // }
});