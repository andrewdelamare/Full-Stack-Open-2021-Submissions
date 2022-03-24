import axios from 'axios';
import {asObject} from '../reducers/anecdoteReducer';
const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const addAnecdote = async (anec) => {
  const response = await axios.post(baseUrl, asObject(anec));
  return response.data;
};
