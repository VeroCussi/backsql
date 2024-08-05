const express = require('express');
const app = express();
const db = require('./models');
const Sequelize = require("sequelize");
require('dotenv').config()

// Importar las rutas
const userRoutes = require('./routes/user.route');
const taskRoutes = require('./routes/tasks.route');
const completedRoutes = require('./routes/completed.route');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH,OPTIONS');
  next();
});

// Conexion bdd
db.sequelize.sync({ alter: true }) // modifica las tablas existentes sin eliminarlas
  .then(() => {
    console.log("Database & tables updated!");
  })
  .catch(err => console.log(err));

// esta es una de las maneras de hacerlo para ocultar las contraseñas
const sequelize = new Sequelize({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql'
  })

// Comprobar la conexión a la base de datos
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.use(express.json());
// Rutas en la aplicación
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/completed', completedRoutes);

module.exports = app;
