import React from 'react';
import {
  MenuItem,
  Select as MUISelect,
} from '@material-ui/core';

type SelectProps = {
  options: string[];
  onChange: () => void;
  value: string;
  label: string;
}

export const Select: React.FC<SelectProps> = ({
  options, onChange, value, label,
}) => (
  <MUISelect value={value} onChange={onChange} label={label} fullWidth>
    {options.map((option) => (
      <MenuItem value={option}>
        {option}
      </MenuItem>
    ))}
  </MUISelect>
);
