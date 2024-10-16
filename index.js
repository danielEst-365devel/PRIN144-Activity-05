const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const tasks = [{ id: 1, name: "Task", isDone: false }, { id: 2, name: "Task2", isDone: false }];

let taskId = tasks.length;

// http://localhost:3000/tasks or http://localhost:3000/tasks?name=test 
app.get('/tasks', (request, response) => {
    const { name } = request.query;
    if (name) {
        const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(name.toLowerCase()));
        response.json(filteredTasks);
    } else {
        response.json(tasks);
    }
});

// http://localhost:3000/tasks/1
app.get('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    
    if (task) {
        response.json(task);
    } else {
        response.status(404).send('Task not found');
    }
});

// http://localhost:3000/tasks
app.post('/tasks', (request, response) => {
    taskId++;
    request.body.id = taskId;
    request.body.isDone = false;
    tasks.push(request.body);
    response.status(201).json();
});

// http://localhost:3000/tasks/:id
app.put('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...request.body };
        response.json(tasks[taskIndex]);
    } else {
        response.status(404).send('Task not found');
    }
});

// http://localhost:3000/tasks/:id
app.patch('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    
    if (task) {
        Object.assign(task, request.body);
        response.json(task);
    } else {
        response.status(404).send('Task not found');
    }
});


// http://localhost:3000/tasks/:id
app.delete('/tasks/:id', (request, response) => {
    const id = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        response.status(204).send();
    } else {
        response.status(404).send('Task not found');
    }
});

/*
GET REQUESTS
****************************************************************************************
GET ALL TASKS: 
http://localhost:3000/tasks 

GET SPECIFIC TASKS USING QUERY STRING: 
http://localhost:3000/tasks?name=test 

GET SPECIFIC TASKS USING ROUTE PARAMETERS: 
http://localhost:3000/tasks?name=test 

****************************************************************************************

POST REQUESTS
****************************************************************************************
http://localhost:3000/tasks

Request Body:
{
    "name": "Task3"
}

****************************************************************************************

PUT REQUESTS
****************************************************************************************
http://localhost:3000/tasks/1

Request Body:
{
    "name": "Renamed Task 1",
    "isDone": true
}

or...

{
    "id": 3,
    "name": "Renamed Task 1",
    "isDone": true
}
****************************************************************************************

PATCH REQUESTS
****************************************************************************************
http://localhost:3000/tasks/1

Request Body:
{
    "name": "Renamed Task 1",
    "isDone": true
}
****************************************************************************************

DELETE REQUESTS
****************************************************************************************
http://localhost:3000/tasks/1
Delete Task 1 with ID 1
****************************************************************************************
*/