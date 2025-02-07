import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks(token);
    setTasks(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newTask = await createTask(token, title, description);
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    const updated = await updateTask(token, taskId, { completed: !currentStatus });
    setTasks(tasks.map(t => (t._id === taskId ? updated : t)));
  };

  const handleDelete = async (taskId) => {
    await deleteTask(token, taskId);
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  return (
    <div>
      <h3>Tasks</h3>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleToggleComplete(task._id, task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;