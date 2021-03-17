import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { ShoppingBasket as ShoppingBasketIcon } from '@material-ui/icons';

import { Ball } from 'interfaces/Ball';
import { fetchBalls, putBallInBasket } from 'services/api';

import { TableHeader } from 'components/TableHeader';

export const Balls = () => {
  const [balls, setBalls] = useState<Ball[]>([]);

  const fetchData = async () => {
    const { data } = await fetchBalls();
    setBalls(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onBallIconClick = async (id: number) => {
    await putBallInBasket(id);
    fetchData();
  };

  return (
    <>
      <TableHeader text="Balls" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>color</TableCell>
              <TableCell>size</TableCell>
              <TableCell>pattern</TableCell>
              <TableCell>has holes</TableCell>
              <TableCell>Basket id</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balls.map(({
              id, color, size, pattern, hasHoles, basket,
            }) => (
              <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{color}</TableCell>
                <TableCell>{size}</TableCell>
                <TableCell>{pattern}</TableCell>
                <TableCell>{hasHoles ? 'yes' : 'no'}</TableCell>
                <TableCell>{basket?.id}</TableCell>
                <TableCell>
                  <Tooltip title="Найти корзину и положить">
                    <IconButton onClick={() => onBallIconClick(id)}>
                      <ShoppingBasketIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
