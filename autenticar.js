const express = require("express"); 
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

app.use(express.json());

/// conexion base de datos mysql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_gestion_tareas',
    
})

// generar  token
function generateAccessToken(username) {
  return jwt.sign({ username }, 'secret_key', { expiresIn: '1800s' });
}

// Registro endpoint
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  // validar usuario escrito
  if (!username ||!password) {
    return res.status(400).send('Username y password son requeridos.');
  }

  // comparar password escrito con el almacenado
  const validPassword = await bcrypt.compare(password, storedHash);

  if (!validPassword) {
    return res.status(401).send('Invalido username o password.');
  }

  // si el password es corecto, se genera el JWT 
  const token = jwt.sign({ username: username }, 'your_jwt_secret_key');
  res.send({ token });
});
