import React from 'react';
import {
  AppBar as MUIAppBar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MenuItem } from 'interfaces/MenuItem';

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 22px;
`;

const SingleLineList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`;

const CustomListItem = styled.li`
  padding: 10px;
  width: auto;
`;

type AppBarProps = {
  menuItems: MenuItem[]
}

const AppBar: React.FC<AppBarProps> = ({ menuItems }) => (
  <>
    <MUIAppBar color="default">
      <SingleLineList>
        {menuItems.map(({ link, name }) => (
          <CustomListItem key={name}>
            <CustomLink to={link}>{name}</CustomLink>
          </CustomListItem>
        ))}
      </SingleLineList>
    </MUIAppBar>
  </>
);

export default AppBar;
