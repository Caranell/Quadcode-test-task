import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Header = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

type TableHeaderProps = {
  text: string;
}
export const TableHeader: React.FC<TableHeaderProps> = ({ text }) => (
  <Header variant="h4">{text}</Header>
);
