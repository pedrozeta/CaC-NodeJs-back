import express from 'express';
import pool from './config/db.js';

const app = express();

// Define routes here
app.get('/', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM users');
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Hubo un error al consultar la BD', err);
        res.status(500).send('Hubo un error al consultar la BD');
    }
});

app.post('/users', (req, res) => {
    // Create a new user
});

app.get('/users', (req, res) => {
    // Get all users
});

app.get('/users/:id', (req, res) => {
    // Get a specific user by ID
});

app.put('/users/:id', (req, res) => {
    // Update a specific user by ID
});

app.delete('/users/:id', (req, res) => {
    // Delete a specific user by ID
});

app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000');
});