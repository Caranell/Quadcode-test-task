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
import { TableHeader } from 'components/TableHeader';

import { fetchBaskets } from 'services/api';
import { Basket } from 'interfaces/Basket';

export const Baskets = () => {
  const [baskets, setBaskets] = useState<Basket[]>([]);

  const fetchData = async () => {
    const { data } = await fetchBaskets();
    setBaskets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TableHeader text="Baskets" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>color</TableCell>
              <TableCell>size</TableCell>
              <TableCell>pattern</TableCell>
              <TableCell>has holes</TableCell>
              <TableCell>number of balls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {baskets.map(({
              id, color, size, pattern, hasHoles, balls,
            }) => (
              <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{color}</TableCell>
                <TableCell>{size}</TableCell>
                <TableCell>{pattern}</TableCell>
                <TableCell>{hasHoles ? 'yes' : 'no'}</TableCell>
                <TableCell>{balls?.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
