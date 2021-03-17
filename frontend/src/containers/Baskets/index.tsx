import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Edit as EditIcon, ShoppingBasket as ShoppingBasketIcon } from '@material-ui/icons';

import { Basket } from 'interfaces/Basket';
import { fetchBaskets, putBallsInBasket } from 'services/api';

import { TableHeader } from 'components/TableHeader';
import { Modal } from './Modal';

export const Baskets = () => {
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [editingRecord, setEditingRecord] = useState<Basket | null>(null);

  const fetchData = async () => {
    const { data } = await fetchBaskets();
    setBaskets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onEdit = (record: Basket) => setEditingRecord(record);
  const onClose = () => setEditingRecord(null);

  const onBasketIconClick = async (id: number) => {
    await putBallsInBasket(id);
    fetchData();
  };

  return (
    <>
      <Modal
        record={editingRecord}
        onClose={onClose}
        afterSubmit={fetchData}
      />
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
              <TableCell>Actions</TableCell>
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
                <TableCell>
                  <IconButton onClick={() => onEdit({
                    id, color, size, pattern, hasHoles,
                  })}
                  >
                    <EditIcon />
                  </IconButton>
                  <Tooltip title="Разместить шары в корзину">
                    <IconButton onClick={() => onBasketIconClick(id)}>
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
