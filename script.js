let books = [];
const listSection = document.querySelector('.list-section');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const theForm = document.querySelector('form');

// adding items in the books array

function removeBook(bookitem, i) {
  const bookBlock = document.getElementById(i);
  books = books.filter((item) => item !== bookitem);
  localStorage.setItem('collectedbooks', JSON.stringify(books));
  listSection.removeChild(bookBlock);
}

function addBookitem(bookitem, i) {
  const bookBlock = document.createElement('div');
  bookBlock.classList.add('bookBlock');
  bookBlock.id = i;

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.innerText = 'Remove';

  const underLine = document.createElement('hr');

  bookBlock.innerHTML = `<p class="book-title">${bookitem.title}</p>
    <p class="book-Author">${bookitem.author}</p> `;
  bookBlock.appendChild(removeBtn);
  bookBlock.appendChild(underLine);
  listSection.appendChild(bookBlock);

  removeBtn.onclick = () => {
    removeBook(bookitem, i);
  };
}

function addBooks(item) {
  books.push({
    title: bookTitle.value,
    author: bookAuthor.value,
  });

  localStorage.setItem('collectedbooks', JSON.stringify(books));
  bookTitle.value = '';
  bookAuthor.value = '';
  addBookitem(item, (books.length - 1));
}

function updateUi() {
  if (localStorage.getItem('collectedbooks')) {
    books = JSON.parse(localStorage.getItem('collectedbooks'));
    books.forEach((bookitem, i) => {
      addBookitem(bookitem, i);
    });
  } else {
    localStorage.setItem('collectedbooks', '');
    books = [];
  }
}

updateUi();

theForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addBooks({
    title: bookTitle.value,
    author: bookAuthor.value,
  });
});
