const express = require('express');
const app = express();
const notes = [];

app.use(express.json());

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    const note = { id: notes.length + 1, title, content };
    notes.push(note);
    res.json(note);
});

app.put('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
        notes[index] = { id, title, content };
        res.json(notes[index]);
    } else {
        res.status(404).json({ error: 'Nota no encontrada' });
    }
});

app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
        notes.splice(index,