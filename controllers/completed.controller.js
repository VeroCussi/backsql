const db = require('../models');
const Task = db.Task;
const Completed = db.Completed;

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const [completed, created] = await Completed.findOrCreate({
      where: { task_id: req.params.id },
      defaults: { status: 'done' }
    });

    if (!created) {
      completed.status = 'done';
      await completed.save();
    }

    res.status(200).json(completed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markTaskAsPending = async (req, res) => {
  try {
    const completed = await Completed.findOne({
      where: { task_id: req.params.id }
    });

    if (!completed) {
      return res.status(404).json({ message: 'Completed record not found' });
    }

    completed.status = 'pending';
    await completed.save();

    res.status(200).json(completed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllCompleted = async (req, res) => {
  try {
    const completedTasks = await Completed.findAll({
      where: { status: 'done' },
      include: [{
        model: Task,
        as: 'task',
        attributes: ['title', 'description'] // Incluye campos relevantes de la tabla Tasks
      }]
    });
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
