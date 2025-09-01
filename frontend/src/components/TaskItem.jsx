import React from 'react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className={`card mb-3 border-0 shadow-sm ${task.status === 'completed' ? 'bg-light' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-2">
              <button
                className={`btn btn-sm me-3 ${task.status === 'completed' ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => onToggleStatus(task._id)}
                title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
              >
                <i className={`fas ${task.status === 'completed' ? 'fa-check' : 'fa-circle'}`}></i>
              </button>
              <h6 className={`mb-0 ${task.status === 'completed' ? 'text-muted text-decoration-line-through' : 'text-dark'}`}>
                {task.title}
              </h6>
            </div>
            
            {task.description && (
              <p className={`mb-2 ${task.status === 'completed' ? 'text-muted' : 'text-dark'}`}>
                {task.description}
              </p>
            )}
            
            <div className="d-flex align-items-center gap-3">
              <span className={`badge ${getPriorityBadge(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              
              {task.dueDate && (
                <small className={`${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-danger' : 'text-muted'}`}>
                  <i className="fas fa-calendar me-1"></i>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </small>
              )}
              
              <small className="text-muted">
                <i className="fas fa-clock me-1"></i>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
          
          <div className="btn-group btn-group-sm" role="group">
            <button
              className="btn btn-outline-dark"
              onClick={() => onEdit(task)}
              title="Edit task"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(task._id)}
              title="Delete task"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
