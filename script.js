const addBtn = document.querySelector('.add-btn');
const bookTitle = document.getElementById('title').value;
const bookAuthor = document.getElementById('author').value;

function Book(title, author) {
  this.title = title;
  this.author = author;
}

addBtn.addEventListener('click', () => {
  const newBook = new Book(bookTitle, bookAuthor);
  console.log(newBook);
});
