const notesList = document.getElementById('notes-list');
const newNoteBtn = document.getElementById('new-note-btn');
const editNoteForm = document.getElementById('edit-note-form');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const deleteBtn = document.getElementById('delete-btn');
const searchInput = document.getElementById('search-input');

let notes = [];

// Función para renderizar la lista de notas
function renderNotes() {
  fetch('/api/notas')
   .then(response => response.json())
   .then(data => {
      notes = data;
      notesList.innerHTML = '';
      notes.forEach((note) => {
        const noteElement = document.createElement('li');
        noteElement.textContent = `${note.title} - ${note.tags.join(', ')}`;
        notesList.appendChild(noteElement);
      });
    })
   .catch(error => console.error(error));
}

// Función para crear una nueva nota
function createNote() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value.split(',');
  const note = {
    id: Math.floor(Math.random() * 100000),
    title,
    content,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fetch('/api/notas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
   .then(response => response.json())
   .then(data => {
      notes.push(data);
      renderNotes();
      editNoteForm.reset();
    })
   .catch(error => console.error(error));
}

// Función para editar una nota
function editNote(id) {
  const note = notes.find((note) => note.id === id);
  if (note) {
    document.getElementById('title').value = note.title;
    document.getElementById('content').value = note.content;
    document.getElementById('tags').value = note.tags.join(',');
    deleteBtn.style.display = 'block';
  }
}

// Función para eliminar una nota
function deleteNote(id) {
  fetch(`/api/notas/${id}`, {
    method: 'DELETE',
  })
   .then(response => response.json())
   .then(() => {
      notes = notes.filter((note) => note.id!== id);
      renderNotes();
    })
   .catch(error => console.error(error));
}

// Event listeners
newNoteBtn.addEventListener('click', () => {
  editNoteForm.style.display = 'block';
});

saveBtn.addEventListener('click', createNote);

cancelBtn.addEventListener('click', () => {
  editNoteForm.style.display = 'none';
});

deleteBtn.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  deleteNote(id);
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchTerm) ||
      note.tags.join(',').toLowerCase().includes(searchTerm)
    );
  });
  renderNotes();
});

// Inicializar la lista de notas
renderNotes();