const addBtn = document.querySelector('.add-btn');

let awesomeBooks = [];

newBook = {};

// function Book(title, author) {
//   this.title = title;
//   this.author = author;
// }

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;

  newBook = {
    title: bookTitle,
    author: bookAuthor
  };

  localStorage.setItem('book', JSON.stringify(newBook));
  awesomeBooks = JSON.parse(localStorage.getItem('awesomebook'));

  awesomeBooks.push({
    Title: bookTitle,
    Author: bookAuthor
  });

  localStorage.setItem('awesomebook', JSON.stringify(newBook));







  // let addedBook = localStorage.getItem('addedBook');
  // if (addedBook === null) {
  //   awesomeBooks = [];
  // }
  // else {
  //   addedBook = JSON.parse(addBook);
  // }

  // awesomeBooks.push(newBook);
  // const newBook = new Book(bookTitle, bookAuthor);
  // console.log(newBook);

});
