import { v4 as uuidv4 } from 'uuid'

let bookLibrary = []

const booksList = document.querySelector('#list')

const fetchBooks = () => {
	// fetch
	fetch('http://localhost:3000/books')
		.then(response => {
			return response.json()
		})
		.then(data => {
			bookLibrary = data
			renderBooks(bookLibrary)
		})
		.catch(error => {
			console.log(error.message)
		})
}

const booksForm = document.querySelector('#booksForm')
const searchInput = document.querySelector('#searchInput')
const addBookForm = document.querySelector('#addBookForm')
const addBookTitleInput = document.querySelector('#newBookTitle')
const addBookCategoryInput = document.querySelector('#newBookCategory')
const addBookYearInput = document.querySelector('#newBookYear')
const addBookAuthorInput = document.querySelector('#newBookAuthor')
const addBookPriceInput = document.querySelector('#newBookPrice')

const renderBooks = books => {
	booksList.innerHTML = ''

	books.forEach(book => {
		booksList.innerHTML += `
        <li>
          <h2>${book.title}</h2>
          <p>Kategoria: ${book.category}</p>
          <p>Autor: ${book.author}</p>
          <p>Rok Wydania: ${book.year}</p>
          <p>Cena: ${book.price}zł</p>
        </li>
      `
	})
}

const filterBook = event => {
	event.preventDefault()

	const foundBooks = bookLibrary.filter(book => {
		return book.title.toLowerCase().includes(searchInput.value.toLowerCase())
	})

	renderBooks(foundBooks)
	searchInput.value = ''
}

const addBook = event => {
	event.preventDefault()

	const newBook = {
		id: uuidv4(),
		title: addBookTitleInput.value,
		category: addBookCategoryInput.value,
		author: addBookAuthorInput.value,
		year: addBookYearInput.value,
		price: addBookPriceInput.value,
	}

	bookLibrary.push(newBook)
	localStorage.setItem('books', JSON.stringify(bookLibrary))
	renderBooks(bookLibrary)

	addBookTitleInput.value = ''
	addBookCategoryInput.value = ''
	addBookAuthorInput.value = ''
	addBookYearInput.value = ''
	addBookPriceInput.value = ''
}

fetchBooks()
booksForm.addEventListener('submit', filterBook)
addBookForm.addEventListener('submit', addBook)
