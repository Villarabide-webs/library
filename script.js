// ================================
// ARRAY PRINCIPAL DE LA LIBRERÍA
// ================================

// Aquí guardamos TODOS los libros.
// Este array es el "estado" de la aplicación.
const myLibrary = [];


// ================================
// CONSTRUCTOR DE LIBROS
// ================================

// Constructor Book: define cómo es un libro
function Book(title, author, pages, read) {

  // Generamos un ID único para cada libro
  // crypto.randomUUID() garantiza que no se repita
  this.id = crypto.randomUUID();

  // Guardamos el título del libro
  this.title = title;

  // Guardamos el autor
  this.author = author;

  // Guardamos el número de páginas
  this.pages = pages;

  // Guardamos si está leído (true / false)
  this.read = read;
}


// ================================
// MÉTODOS DEL PROTOTIPO
// ================================

// Método para cambiar el estado de lectura
// Se añade al prototipo para ahorrar memoria
Book.prototype.toggleRead = function () {

  // Si es true pasa a false, y viceversa
  this.read = !this.read;
};


// ================================
// ELEMENTOS DEL DOM
// ================================

// Botón para mostrar / ocultar el formulario
const newBookBtn = document.getElementById('new-book-btn');

// Formulario para añadir libros
const bookForm = document.getElementById('book-form');

// Contenedor donde se muestran los libros
const libraryContainer = document.getElementById('library');


// ================================
// MOSTRAR / OCULTAR FORMULARIO
// ================================

// Cuando se hace click en "Nuevo libro"
newBookBtn.addEventListener('click', () => {

  // Alternamos la clase "hidden"
  // Si está oculto → se muestra
  // Si está visible → se oculta
  bookForm.classList.toggle('hidden');
});


// ================================
// AÑADIR LIBRO A LA LIBRERÍA
// ================================

// Esta función crea un libro y lo guarda en el array
function addBookToLibrary(title, author, pages, read) {

  // Creamos una nueva instancia del libro
  const newBook = new Book(title, author, pages, read);

  // Añadimos el libro al array principal
  myLibrary.push(newBook);

  // Volvemos a pintar la librería en pantalla
  renderLibrary();
}


// ================================
// RENDERIZAR LA LIBRERÍA
// ================================

// Esta función SOLO se encarga de mostrar los libros en el DOM
function renderLibrary() {

  // Limpiamos el contenedor antes de volver a pintar
  libraryContainer.innerHTML = '';

  // Recorremos todos los libros del array
  myLibrary.forEach(book => {

    // Creamos la tarjeta del libro
    const card = document.createElement('div');
    card.classList.add('card');

    // Guardamos el ID del libro en un data-attribute
    // Esto nos permite identificar qué libro es
    card.dataset.id = book.id;

    // Contenido HTML de la tarjeta
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Páginas:</strong> ${book.pages}</p>
      <p><strong>Estado:</strong> ${book.read ? 'Leído ✅' : 'No leído ❌'}</p>

      <button class="toggle-read">
        Cambiar estado
      </button>

      <button class="remove-book">
        Eliminar
      </button>
    `;

    // Añadimos la tarjeta al contenedor principal
    libraryContainer.appendChild(card);
  });
}


// ================================
// MANEJAR ENVÍO DEL FORMULARIO
// ================================

// Escuchamos cuando el formulario se envía
bookForm.addEventListener('submit', (event) => {

  // Evitamos que la página se recargue
  event.preventDefault();

  // Obtenemos los valores de los inputs
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  // Añadimos el libro a la librería
  addBookToLibrary(title, author, pages, read);

  // Reseteamos el formulario (limpia inputs)
  bookForm.reset();

  // Ocultamos el formulario usando SOLO la clase
  bookForm.classList.add('hidden');
});


// ================================
// BOTONES DE CADA TARJETA
// ================================

// Usamos delegación de eventos
// Escuchamos clicks en el contenedor general
libraryContainer.addEventListener('click', (event) => {

  // Buscamos la tarjeta más cercana al click
  const card = event.target.closest('.card');

  // Si no hay tarjeta, salimos
  if (!card) return;

  // Obtenemos el ID del libro desde data-id
  const bookId = card.dataset.id;

  // Buscamos el libro correspondiente en el array
  const book = myLibrary.find(b => b.id === bookId);

  // Si se pulsa el botón "Cambiar estado"
  if (event.target.classList.contains('toggle-read')) {
    book.toggleRead();
    renderLibrary();
  }

  // Si se pulsa el botón "Eliminar"
  if (event.target.classList.contains('remove-book')) {
    const index = myLibrary.findIndex(b => b.id === bookId);
    myLibrary.splice(index, 1);
    renderLibrary();
  }
});