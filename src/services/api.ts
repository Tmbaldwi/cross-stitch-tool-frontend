// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const getItems = async () => {
  const response = await axios.get(`${API_URL}items/`);
  return response.data;
};

export const createItem = async (itemData: { name: string; description: string }) => {
  const response = await axios.post(`${API_URL}items/`, itemData);
  return response.data;
};
