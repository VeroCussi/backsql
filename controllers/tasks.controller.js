const db = require('../models');  // Importa todo el objeto `db`
const Task = db.Task;  // Extrae el modelo `Task` desde el objeto `db`

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { idTasks: req.params.id }
    });
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { idTasks: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea
// exports.updateTask = async (req, res) => {
//   try {
//     const [updated] = await Task.update(req.body, {
//       where: { id: req.params.id }
//     });
//     if (updated) {
//       const updatedTask = await Task.findByPk(req.params.id);
//       res.status(200).json(updatedTask);
//     } else {
//       res.status(404).json({ message: 'Task not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Eliminar una tarea
// exports.deleteTask = async (req, res) => {
//   try {
//     const deleted = await Task.destroy({
//       where: { id: req.params.id }
//     });
//     if (deleted) {
//       res.status(204).json({ message: 'Task deleted' });
//     } else {
//       res.status(404).json({ message: 'Task not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };