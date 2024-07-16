const express = require('express');
const app = express();
const notes = [];
const Note = require('./models/Note');

app.use(express.json());
app.use(express.static('client'));


const uuid = require('uuid');


app.get('/notes', (req, res) => {
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: 'Nota no encontrada' });
  }
});

app.post('/notes', (req, res) => {
  const { title, content, tags } = req.body;
  if (title && content) {
    const note = new Note(uuid.v4(), title, content, tags);
    notes.push(note);
    res.json(note);
  } else {
    res.status(400).json({ error: 'Título y contenido son obligatorios' });
  }
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, tags } = req.body;
  const note = notes.find((n) => n.id === id);
  if (note) {
    note.title = title;
    note.content = content;
    note.tags = tags;
    note.updatedAt = new Date();
    res.json(note);
  } else {
    res.status(404).json({ error: 'Nota no encontrada' });
  }
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Nota no encontrada' });
  }
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});