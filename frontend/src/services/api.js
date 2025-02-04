import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // or the deployed URL

export const registerUser = async (username, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getTasks = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createTask = async (token, title, description) => {
  try {
    const res = await axios.post(`${API_URL}/tasks`, {
      title,
      description,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateTask = async (token, taskId, updatedFields) => {
  try {
    const res = await axios.put(`${API_URL}/tasks/${taskId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteTask = async (token, taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};