import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
const TaskList = ({ tasks, onUpdate, onDelete, onToggleStatus }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = async (taskId, taskData) => {
    await onUpdate(taskId, taskData);
    setEditingTask(null);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="fas fa-tasks fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No tasks found</h5>
          <p className="text-muted">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-dark text-white py-3">
        <h5 className="mb-0">
          <i className="fas fa-list me-2"></i>
          Tasks ({tasks.length})
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-0 px-4 py-3">
                  <i className="fas fa-check-circle me-2"></i>
                  Status
                </th>
                <th className="border-0 px-4 py-3">
                  <i className="fas fa-tasks me-2"></i>
                  Task
                </th>
                <th className="border-0 px-4 py-3">
                  <i className="fas fa-flag me-2"></i>
                  Priority
                </th>
                <th className="border-0 px-4 py-3">
                  <i className="fas fa-calendar me-2"></i>
                  Due Date
                </th>
                <th className="border-0 px-4 py-3">
                  <i className="fas fa-clock me-2"></i>
                  Created
                </th>
                <th className="border-0 px-4 py-3 text-center">
                  <i className="fas fa-cogs me-2"></i>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className={task.status === 'completed' ? 'table-light' : ''}>
                  <td className="px-4 py-3">
                    <button
                      className={`btn btn-sm ${task.status === 'completed' ? 'btn-success' : 'btn-outline-secondary'}`}
                      onClick={() => onToggleStatus(task._id)}
                      title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                    >
                      <i className={`fas ${task.status === 'completed' ? 'fa-check' : 'fa-circle'}`}></i>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <h6 className={`mb-1 ${task.status === 'completed' ? 'text-muted text-decoration-line-through' : 'text-dark'}`}>
                        {task.title}
                      </h6>
                      {task.description && (
                        <small className="text-muted">
                          {task.description.length > 50 
                            ? `${task.description.substring(0, 50)}...` 
                            : task.description
                          }
                        </small>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${getPriorityBadge(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {task.dueDate ? (
                      <span className={`${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-danger' : 'text-muted'}`}>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-muted">No due date</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <small className="text-muted">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="btn-group btn-group-sm" role="group">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleEdit(task)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">
                  <i className="fas fa-edit me-2"></i>
                  Edit Task
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <TaskForm
                  task={editingTask}
                  onSubmit={(taskData) => handleSave(editingTask._id, taskData)}
                  onCancel={handleCancel}
                  isEditing={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
