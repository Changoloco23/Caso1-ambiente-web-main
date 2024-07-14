const express = require('express');
const app = express();

app.use(express.json());

// Ruta para crear una nueva nota
app.post('/api/notas', (req, res) => {
  const { title, content, tags } = req.body;
  const note = { title, content, tags };
  // Agrega la nota a una base de datos o sistema de almacenamiento
  res.json(note);
});

// Ruta para obtener todas las notas
app.get('/api/notas', (req, res) => {
  const notes = []; // Obtener las notas de la base de datos o sistema de almacenamiento
  res.json(notes);
});

// Ruta para eliminar una nota
app.delete('/api/notas/:id', (req, res) => {
  const id = req.params.id;
  // Eliminar la nota de la base de datos o sistema de almacenamiento
  res.json({ message: 'Nota eliminada' });
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});