import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? { ...task, text: newTask } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, { text: newTask, completed: false }]);
      }
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const filteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'completed'
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
    <div className="app-container">
      <h1 className="title">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <div className="filter-container">
        <button onClick={() => setFilter('all')} className={`filter-button ${filter === 'all' ? 'active' : ''}`}>
          All
        </button>
        <button onClick={() => setFilter('completed')} className={`filter-button ${filter === 'completed' ? 'active' : ''}`}>
          Completed
        </button>
        <button onClick={() => setFilter('pending')} className={`filter-button ${filter === 'pending' ? 'active' : ''}`}>
          Pending
        </button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(index)} className="task-text">
              {task.text}
            </span>
            <div className="task-actions">
              <button onClick={() => editTask(index)} className="edit-button">
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
