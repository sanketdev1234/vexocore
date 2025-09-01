import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        status: task.status || 'pending'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold text-dark">
          <i className="fas fa-tasks me-2"></i>
          Task Title *
        </label>
        <input
          type="text"
          className="form-control border-dark"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-bold text-dark">
          <i className="fas fa-align-left me-2"></i>
          Description
        </label>
        <textarea
          className="form-control border-dark"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Enter task description (optional)"
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="priority" className="form-label fw-bold text-dark">
            <i className="fas fa-flag me-2"></i>
            Priority
          </label>
          <select
            className="form-select border-dark"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="dueDate" className="form-label fw-bold text-dark">
            <i className="fas fa-calendar me-2"></i>
            Due Date
          </label>
          <input
            type="date"
            className="form-control border-dark"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {isEditing && (
        <div className="mb-3">
          <label htmlFor="status" className="form-label fw-bold text-dark">
            <i className="fas fa-check-circle me-2"></i>
            Status
          </label>
          <select
            className="form-select border-dark"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={onCancel}
        >
          <i className="fas fa-times me-2"></i>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-dark px-4 fw-bold"
        >
          <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-2`}></i>
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
