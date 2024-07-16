const noteList = document.getElementById('note-list');
const noteForm = document.getElementById('note-form');
const createNoteButton = document.getElementById('create-note');
const saveNoteButton = document.getElementById('save-note');
const cancelNoteButton = document.getElementById('cancel-note');
const deleteNoteButton = document.getElementById('delete-note');
const searchInput = document.getElementById('search');

let notes = [];


fetch('/notes')
   .then(response => response.json())
   .then((notesData) => {
        notes = notesData;
        renderNotes();
    });


createNoteButton.addEventListener('click', () => {
    noteForm.style.display = 'block';
    createNoteButton.style.display = 'none';
});


saveNoteButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value.split(',');
    if (title && content) {
        const note = { title, content, tags };
        fetch('/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        })
       .then(response => response.json())
       .then((noteData) => {
            notes.push(noteData);
            renderNotes();
            noteForm.style.display = 'none';
            createNoteButton.style.display = 'block';
        });
    }
});


cancelNoteButton.addEventListener('click', () => {
    noteForm.style.display = 'none';
    createNoteButton.style.display = 'block';
});


deleteNoteButton.addEventListener('click', () => {
    const id = document.getElementById('note-id').value;
    fetch(`/notes/${id}`, {
        method: 'DELETE'
    })
   .then(response => response.json())
   .then(() => {
        const index = notes.findIndex((n) => n.id === id);
        if (index!== -1) {
            notes.splice(index, 1);
            renderNotes();
        }
    });
});


function renderNotes() {
    noteList.innerHTML = '';
    notes.forEach((note) => {
        const noteElement = document.createElement('li');
        noteElement.textContent = `${note.title} - ${note.content}`;
        noteElement.addEventListener('click', () => {
            document.getElementById('title').value = note.title;
            document.getElementById('content').value = note.content;
            document.getElementById('tags').value = note.tags.join(',');
            document.getElementById('note-id').value = note.id;
            saveNoteButton.style.display = 'block';
            deleteNoteButton.style.display = 'block';
        });
        noteList.appendChild(noteElement);
    });
}


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm) || note.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
    });
    renderNotes(filteredNotes);
});