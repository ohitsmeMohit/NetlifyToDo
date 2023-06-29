const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/task', (req, res) => {
    const { text } = req.body;
    const task = {
        text,
        completed: false,
    };
    tasks.push(task);
    res.sendStatus(200);
});

app.put('/task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks[id].completed = !tasks[id].completed;
    res.sendStatus(200);
});

app.delete('/task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks.splice(id, 1);
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
