const Tasks = require("../models/taskSchema.js");

//Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const task = new Tasks({ title, description, status, dueDate });
    await task.save();
    console.log("Task created successfully", task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    console.log("Tasks fetched successfully", tasks);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get a task by id
exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("Task fetched successfully", task);
    res.status(200).json(task);
  } catch (err) { 
    res.status(500).json({ error: err.message });
  }
};

//Update a task's status
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Tasks.findByIdAndUpdate(id, { status }, { new: true });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }   

    console.log("Task updated successfully", task);

    res.status(200).json(task);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("Task deleted successfully", task);
    res.status(200).json({ message: "Task deleted successfully", DeletedTask : task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
