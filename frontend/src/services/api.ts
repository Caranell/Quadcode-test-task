import axios from 'axios';
import { Ball } from 'interfaces/Ball';
import { Basket } from 'interfaces/Basket';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchBaskets = () => api.get<Basket[]>('/baskets');

export const fetchBalls = () => api.get<Ball[]>('/balls');
