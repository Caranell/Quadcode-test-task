import axios from 'axios';
import { Ball } from 'interfaces/Ball';
import { Basket } from 'interfaces/Basket';

const api = axios.create({
  baseURL: 'http://localhost:3002',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    alert(response?.data?.message || 'Internal server error');

    return Promise.reject(error);
  },
);

export const fetchBaskets = () => api.get<Basket[]>('/baskets');

export const fetchBalls = () => api.get<Ball[]>('/balls');

export const modifyBasketSettings = ({
  id,
  basket,
}: {
  id: number;
  basket: Basket;
}) => api.put<Basket>(`/baskets/${id}`, basket);

export const putBallsInBasket = (id: number) => api.post<Ball[]>(`/baskets/${id}/put-matching-balls`);

export const putBallInBasket = (id: number) => api.post<Basket>(`/balls/${id}/put-in-basket`);
