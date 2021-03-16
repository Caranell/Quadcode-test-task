import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';

import { modifyBasketSettings } from 'services/api';
import { Basket } from 'interfaces/Basket';

import { Checkbox } from 'components/Checkbox';
import { Select } from 'components/Select';

const patternOptions = ['dots', 'lines'];
const sizeOptions = ['small', 'medium', 'big'];

type ModalProps = {
  record?: Basket | null;
  onClose: () => void;
  afterSubmit: () => {};
};

export const Modal: React.FC<ModalProps> = ({ record, onClose, afterSubmit }) => {
  const { control, reset, handleSubmit } = useForm<Basket>();

  useEffect(() => {
    if (record) {
      reset(record);
    }
  }, [record]);

  const onSubmit = handleSubmit(async (basket) => {
    await modifyBasketSettings({ id: Number(record?.id), basket });
    afterSubmit();
  });

  return (
    <Dialog open={Boolean(record)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{record?.id ? 'Редактирование категории' : 'Создание категории'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="color"
              control={control}
              as={<TextField fullWidth label="color" />}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="hasHoles"
              control={control}
              render={({ onChange, value }) => (
                <Checkbox
                  label="Has holes"
                  checked={value}
                  onChange={
                    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => onChange(checked)
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="pattern"
              control={control}
              render={({ onChange, value }) => (
                <Select label="pattern" options={patternOptions} value={value} onChange={onChange} />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="size"
              control={control}
              render={({ onChange, value }) => (
                <Select label="size" options={sizeOptions} value={value} onChange={onChange} />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button variant="contained" color="primary" type="submit" onClick={onSubmit} autoFocus>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
