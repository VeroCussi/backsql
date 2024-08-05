const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const completedController = require('../controllers/completed.controller.js');

// Rutas estado de las tareas
router.put('/:id/complete', auth, completedController.completeTask);
router.put('/:id/pending', auth, completedController.markTaskAsPending);
router.get('/completed', auth,completedController.getAllCompleted);

module.exports = router;