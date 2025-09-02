import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      queryParams.append('sortBy', filters.sortBy);
      queryParams.append('sortOrder', filters.sortOrder);

      const response = await fetch(`https://vexocore.onrender.com/api/tasks?${queryParams}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch('https://vexocore.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        setShowForm(false);
        fetchTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await fetch(`https://vexocore.onrender.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`https://vexocore.onrender.com/api/tasks/${taskId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          fetchTasks();
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      const response = await fetch(`https://vexocore.onrender.com/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="container py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-dark fw-bold mb-1">
                  <i className="fas fa-tasks me-2"></i>
                  Task Dashboard
                </h2>
                <p className="text-muted mb-0">
                  Welcome back, <span className="fw-bold text-dark">{user?.username}</span>
                </p>
              </div>
              <button
                className="btn btn-dark px-4 py-2 fw-bold"
                onClick={() => setShowForm(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-dark fw-bold">{tasks.length}</h3>
                <p className="text-muted mb-0">Total Tasks</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-warning fw-bold">{pendingTasks.length}</h3>
                <p className="text-muted mb-0">Pending Tasks</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="text-success fw-bold">{completedTasks.length}</h3>
                <p className="text-muted mb-0">Completed Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-3">
                    <select
                      className="form-select border-dark"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select border-dark"
                      value={filters.priority}
                      onChange={(e) => setFilters({...filters, priority: e.target.value})}
                    >
                      <option value="">All Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select border-dark"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    >
                      <option value="createdAt">Created Date</option>
                      <option value="title">Title</option>
                      <option value="priority">Priority</option>
                      <option value="dueDate">Due Date</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select border-dark"
                      value={filters.sortOrder}
                      onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
                    >
                      <option value="desc">Newest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="row">
          <div className="col-12">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </div>
        </div>

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
