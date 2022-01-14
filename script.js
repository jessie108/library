const newBookButton = document.querySelector(".button");
const popup = document.querySelector("#popup");
const popupClose = document.querySelector("#popupClose");
const popupSubmit = document.querySelector("#submit");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");
const bookLibrary = document.querySelector(".library");

let myLibrary = [];

function Book(title, author, pages, read, key) {
  const book = {
    title,
    author,
    pages,
    read,
    key,
  };
  return book;
}

newBookButton.addEventListener("click", function () {
  popup.style.display = "block";
});

popupClose.addEventListener("click", function () {
  popup.style.display = "none";
});

popupSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  popup.style.display = "none";

  const book = Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked,
    Date.now()
  );
  myLibrary.push(book);
  createBookCard(book);
});

function createBookCard(book) {
  const divHTML = `
<div class='close' data-type='CardClose'>&#10006;</div>
<div class='bookCardTitle'>Title: ${bookTitle.value}</div>
<div class='bookCardAuthor'>Author: ${bookAuthor.value}</div>
<div class='bookCardPages'>Pages: ${bookPages.value}</div> 
<button class='cardRead ${book.read === true ? "read" : "unread"}' >${
    book.read === true ? "read" : "unread"
  }</button> `;

  const divFRAG = document.createRange().createContextualFragment(divHTML);
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  bookCard.appendChild(divFRAG);
  bookLibrary.appendChild(bookCard);
  bookCard.dataset.key = book.key;

  bookCard.addEventListener("click", function (e) {
    bookCardDelete(e);
    readChecked(e);
    resetForm();
  });
}

function bookCardDelete(e) {
  if (e.target.dataset.type === "CardClose") {
    myLibrary.forEach(function (book, i) {
      if (e.currentTarget.dataset.key === book.key.toString()) {
        e.currentTarget.remove();
        myLibrary.splice(i, 1);
      }
    });
  }
}
function readChecked(e) {
  if (e.target.classList.contains("cardRead")) {
    myLibrary.forEach(function (book) {
      if (e.currentTarget.dataset.key === book.key.toString()) {
        if (book.read === true) {
          book.read = false;
          e.target.classList.add("unread");
          e.target.classList.remove("read");
          e.target.style.backgroundColor = "#740f0f";
          e.target.textContent = "Unread";
          e.target.style.color = "white";
        } else if (book.read === false) {
          book.read = true;
          e.target.classList.add("read");
          e.target.classList.remove("unread");
          e.target.style.backgroundColor = "#0d614c";
          e.target.textContent = "Read";
          e.target.style.color = "white";
        }
      }
    });
  }
}

function resetForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookCheck.checked = false;
}
