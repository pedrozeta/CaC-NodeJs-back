import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'adfUsersDB',
    waitForConnections: true,
    connectionLimit: 5
});

pool.getConnection()
.then(connection => {
    pool.releaseConnection(connection);
    console.log('La DB está conectada');
})
.catch(err => {
    console.error('Hubo un error al conectar la DB:', err);
});

export default pool;