# JSON Todo with Custom Reconciler

## Project Overview

This project is a minimal Todo application that focuses on learning and implementing key concepts manually.

Instead of using React or other frameworks, I attempted to mimic the core idea behind React’s rendering mechanism by building a custom reconciler from scratch. This helped me understand how diffing and UI updates work at a lower level.

## Backend Design

The backend is built using Node.js and Express. Todo items are stored in a local `data.json` file to simulate a lightweight database.

All the commonly used HTTP methods are implemented:

- **GET**: Fetch all todo items  
- **POST**: Add a new todo  
- **PUT**: Update an existing todo  
- **DELETE**: Remove a todo  

CORS is configured in the backend to allow communication between the frontend and backend. This was essential since the frontend runs on port `5500` and the backend may run on a different port (e.g., `3000`). You can change the port as per your convenience.
