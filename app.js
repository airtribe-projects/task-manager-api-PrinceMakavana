const express = require('express');
const app = express();
const port = 3000;

let tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true
    },
    {
        id: 2,
        title: "Create project structure",
        description: "Set up folders and files for the project",
        completed: false
    }
];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== 'boolean') {
        res.status(400).send({ error: 'Invalid task data' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed
    };
    tasks.push(newTask);
    res.status(201).json(newTask)
});

app.get('/tasks' , (req, res) => {
    res.status(200).send(tasks);
});

app.get('/tasks/:id', (req , res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id == taskId);
    if (!task) {
        res.status(404).send({ error: 'Task not found' });
    }
    if (task) {
        res.status(200).json(task);
    }
})

app.put('/tasks/:id', (req , res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
         res.status(404).send({ error: 'Task not found' });
    }
    if (!title || !description || typeof completed !== 'boolean') {
        res.status(400).send({ error: 'Invalid task data' });
    }
    tasks[taskIndex] = { id: taskId, title, description, completed };
    res.status(200).json(tasks[taskIndex]);
})

app.delete('/tasks/:id', (req , res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
         res.status(404).send({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).send();
});

module.exports = app;