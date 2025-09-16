const express = require('express');
const app = express();
const port = 3000;

let tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        priority : "high",
        completed: true
    },
    {
        id: 2,
        title: "Create project structure",
        description: "Set up folders and files for the project",
        priority : "medium",
        completed: false
    }
];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Task manager API listening at http://localhost:${port}`);
});


// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== 'boolean') {
        res.status(400).send({ error: 'Invalid task data' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        priority: "low",
        completed
    };
    tasks.push(newTask);
    res.status(201).json(newTask)
});

// Get all tasks
app.get('/tasks' , (req, res) => {
    // GET by query params /tasks?completed=true to filter by completion status

    const { completed } = req.query;
    
    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        const filteredTasks = tasks.filter(t => t.completed === isCompleted);
        return res.status(200).send(filteredTasks);
    }
    res.status(200).send(tasks);
});

// Get a task by ID
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

// Update a task by ID
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
    tasks[taskIndex] = { id: taskId, title, description, completed  , priority: tasks[taskIndex].priority};
    res.status(200).json(tasks[taskIndex]);
})

// Delete a task by ID
app.delete('/tasks/:id', (req , res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
         res.status(404).send({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).send();
});

// Get tasks by priority level
app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level;
    const priorityLevels = ['low', 'medium', 'high'];
    if (!priorityLevels.includes(level)) {
        res.status(400).send({ error: 'Invalid priority level' });
    }
    const filteredTasks = tasks.filter(t => t.priority === level);
    res.status(200).json(filteredTasks);
});

module.exports = app;