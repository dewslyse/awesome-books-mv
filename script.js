/* eslint-disable max-classes-per-file */
const addBtn = document.querySelector('.add-btn');
const addedBooks = document.querySelector('.added-books');
const contact = document.querySelector('.contact');
const contactLink = document.querySelector('.contact-link');
const listLink = document.querySelector('.list-link');
const addNewLink = document.querySelector('.add-new-link');
const booksList = document.querySelector('.book-list');
const newSection = document.querySelector('.add-new');
const link = document.querySelectorAll('.link');
const dateTime = document.getElementById('current-date');

//Create book class
class Book {
    constructor(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
    }
}

class Library {
    static retrieveBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Library.retrieveBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Library.retrieveBooks();

        books.forEach((book, index) => {
            if (book.id === id) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

class Actions {
    static displayBooks() {
        const books = Library.retrieveBooks();

        books.forEach((book) => {
            Actions.addNewBook(book);
        });
    }

    static addNewBook(book) {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book');
        const p = document.createElement('p');
        p.classList.add('item');
        // p.textContent = `"${book.title}" by ${book.author}`;
        p.innerHTML = `
            "<span class="added-title">${book.title}</span>" by ${book.author}
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add(`rm-${book.id}`);
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';

        removeBtn.addEventListener('click', () => {
            Library.removeBook(book.id);
        });

        bookContainer.appendChild(p);
        bookContainer.appendChild(removeBtn);
        addedBooks.appendChild(bookContainer);
    }

    static deleteBook(item) {
        if (item.classList.contains('remove-btn')) {
            item.parentElement.remove();
        }
    }

    static resetInputs() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
    }
}

//Display books from Library
document.addEventListener('DOMContentLoaded', Actions.displayBooks);

//Add a new book
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookId = (new Date()).getTime()

    if (bookTitle === '' || bookAuthor === '') {
        alert('Please fill in all book details');
    }
    else {
        const book = new Book(bookTitle, bookAuthor, bookId);
        Actions.addNewBook(book);
        Library.addBook(book);
        Actions.resetInputs();
    }
});

//Delete added book 
addedBooks.addEventListener('click', (e) => {
    Actions.deleteBook(e.target);
});


listLink.addEventListener('click', () => {
    booksList.classList.remove('hide');
    contact.classList.add('hide');
    newSection.classList.add('hide');
});

addNewLink.addEventListener('click', () => {
    booksList.classList.add('hide');
    contact.classList.add('hide');
    newSection.classList.remove('hide');
});

contactLink.addEventListener('click', () => {
    booksList.classList.add('hide');
    contact.classList.remove('hide');
    newSection.classList.add('hide');
});

function activeLink() {
    link.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

link.forEach((item) => item.addEventListener('click', activeLink));

const currentDate = new Date();
const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()}`;
const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
const dateCurrentTime = `${date}, ${time}`;
dateTime.innerHTML = dateCurrentTime;