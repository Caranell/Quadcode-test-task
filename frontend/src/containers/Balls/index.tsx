import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from '@material-ui/core';
import { fetchBalls } from 'services/api';
import { TableHeader } from 'components/TableHeader';
import { Ball } from 'interfaces/Ball';

export const Balls = () => {
  const [balls, setBalls] = useState<Ball[]>([]);

  const fetchData = async () => {
    const { data } = await fetchBalls();
    setBalls(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
