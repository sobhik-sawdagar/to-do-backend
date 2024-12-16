const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;