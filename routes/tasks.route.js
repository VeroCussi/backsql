// EJEMPLO DE ROUTER CON CRUD

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const taskController = require('../controllers/tasks.controller.js');

router.post('/', auth, taskController.createTask);
router.get('/all', auth, taskController.getAllTasks);
router.get('/:id', auth, taskController.getTaskById);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
