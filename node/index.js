import express from 'express';
import pool from './config/db.js';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Definir rutas
app.get('/users', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM users'
        const [rows, fields] = await connection.query(sql);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Hubo un error al consultar la BD', err);
        res.status(500).send('Hubo un error al consultar la BD');
    }
});
//revisado



app.get('/users/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id_user = req.params.id
        const sql = 'SELECT * FROM users WHERE id_user = ?';

        const [rows, fields] = await connection.query(sql, [id_user]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Hubo un error al consultar la BD:', err);
        res.status(500).send('Hubo un error al consultar la BD');
    }
});
//revisado

app.post('/users', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const userData = req.body;
        const sql = 'INSERT INTO users SET ?';
        const [rows] = await connection.query(sql, [userData]);//;
        connection.release();
        res.json({mensaje: 'Usuario agregado', id_user: rows.insertId});
            } catch (err) {
                console.error('Hubo un error al agregar el usuario', err);
                res.status(500).send('Hubo un error al agregar el usuario'); 
            }
});
//revisado




app.get('/', (req, res) => {
    // Get all users
});



//PUT
app.post('/users/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id_user = req.params.id
        const userData = req.body;
        const sql = 'UPDATE users SET ? WHERE id_user = ?';
        const [rows] = await connection.query(sql, [userData, id_user]);
        connection.release();
        res.json({ mensaje: 'Datos de usuario actualizados'});
    } catch (err) {
        console.error('Hubo un error al consultar la BD', err);
        res.status(500).send('Hubo un error al consultar la BD');
    }
});
//revisado

//DELETE
app.get('/users/borrar/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id_user = req.params.id;                   //id_user
        const sql = 'DELETE FROM users WHERE id_user = ?';
        const [rows] = await connection.query(sql, [id_user]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json({ mensaje: 'Datos de usuario borrados'});
        }
    } catch (err) {
        console.error('Hubo un error al consultar la BD', err);
        res.status(500).send('Hubo un error al consultar la BD');
    }
});



app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000');
});