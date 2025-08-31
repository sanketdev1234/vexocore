require("dotenv").config({path:require("path").resolve(__dirname,"../.env")});
const task = require("../models/Task");

// Get all tasks for the authenticated user
module.exports.getAllTasks = async (req, res, next) => {
    try {
        const { status, priority, sortBy = "createdAt", sortOrder = "desc" } = req.query;
        
        // Build filter object
        const filter = { user: req.user._id };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;

        const tasks = await task.find(filter)
            .sort(sort)
            .select("-__v");

        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching tasks");
    }
};

// Create a new task
module.exports.createTask = async (req, res, next) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title) {
            return res.status(400).send("Title is required");
        }

        const newTask = new task({
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
            user: req.user._id
        });

        await newTask.save();
        console.log("New task created:", newTask);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating task");
    }
};

// Get a specific task
module.exports.getTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const foundTask = await task.findOne({
            _id: taskId,
            user: req.user._id
        }).select("-__v");

        if (!foundTask) {
            return res.status(404).send("Task not found");
        }

        res.json({
            success: true,
            data: foundTask
        });

    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Task not found");
        }
        res.status(500).send("Error fetching task");
    }
};

// Update a task
module.exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const { title, description, status, priority, dueDate } = req.body;

        const foundTask = await task.findOne({
            _id: taskId,
            user: req.user._id
        });

        if (!foundTask) {
            return res.status(404).send("Task not found");
        }

        // Update fields
        if (title !== undefined) foundTask.title = title;
        if (description !== undefined) foundTask.description = description;
        if (status !== undefined) foundTask.status = status;
        if (priority !== undefined) foundTask.priority = priority;
        if (dueDate !== undefined) foundTask.dueDate = dueDate ? new Date(dueDate) : null;

        await foundTask.save();
        console.log("Task updated:", foundTask);

        res.json({
            success: true,
            message: "Task updated successfully",
            data: foundTask
        });

    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Task not found");
        }
        res.status(500).send("Error updating task");
    }
};

// Toggle task status
module.exports.toggleTaskStatus = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        const foundTask = await task.findOne({
            _id: taskId,
            user: req.user._id
        });

        if (!foundTask) {
            return res.status(404).send("Task not found");
        }

        // Toggle status
        foundTask.status = foundTask.status === "pending" ? "completed" : "pending";
        await foundTask.save();
        console.log("Task status toggled:", foundTask);

        res.json({
            success: true,
            message: `Task marked as ${foundTask.status}`,
            data: foundTask
        });

    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Task not found");
        }
        res.status(500).send("Error toggling task status");
    }
};

// Delete a task
module.exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await task.findOneAndDelete({
            _id: taskId,
            user: req.user._id
        });

        if (!deletedTask) {
            return res.status(404).send("Task not found");
        }

        console.log("Task deleted:", deletedTask);

        res.json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Task not found");
        }
        res.status(500).send("Error deleting task");
    }
};
