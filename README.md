# Task Manager API

A simple RESTful API for managing tasks, built with Node.js and Express.js. This API allows you to create, read, update, and delete tasks, as well as filter them by completion status.

## Overview

This task manager API provides basic CRUD operations for tasks. Each task has the following properties:
- ID (automatically assigned)
- Title
- Description
- Priority (high/medium/low)
- Completion status

## Prerequisites

- Node.js (>= 18.0.0)
- npm (comes with Node.js)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/airtribe-projects/task-manager-api-PrinceMakavana.git
   cd task-manager-api-PrinceMakavana
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   - For production:
     ```bash
     npm start
     ```
   - For development (with auto-reload):
     ```bash
     npm run dev
     ```

The server will start on `http://localhost:3000`.

## API Endpoints

### GET /tasks
- **Description**: Retrieve all tasks
- **Query Parameters**:
  - `completed` (optional): Filter tasks by completion status (true/false)
- **Example**:
  ```bash
  # Get all tasks
  curl http://localhost:3000/tasks
  
  # Get completed tasks
  curl http://localhost:3000/tasks?completed=true
  ```

### GET /tasks/:id
- **Description**: Retrieve a specific task by ID
- **Example**:
  ```bash
  curl http://localhost:3000/tasks/1
  ```

### POST /tasks
- **Description**: Create a new task
- **Request Body**:
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "completed": false
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title": "New task", "description": "Task description", "completed": false}'
  ```

### PUT /tasks/:id
- **Description**: Update an existing task
- **Request Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Example**:
  ```bash
  curl -X PUT http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"title": "Updated task", "description": "New description", "completed": true}'
  ```

### DELETE /tasks/:id
- **Description**: Delete a task
- **Example**:
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Testing

The project includes automated tests using the `tap` testing framework. To run the tests:

```bash
npm test
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Successful operation
- 201: Resource created
- 400: Invalid request data
- 404: Resource not found

## Dependencies

- express: Web framework
- body-parser: Request body parsing
- cors: Cross-Origin Resource Sharing
- And other supporting packages (see package.json)

## License

ISC
