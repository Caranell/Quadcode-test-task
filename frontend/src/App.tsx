import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { MenuItem } from 'interfaces/MenuItem';
import AppBar from 'components/AppBar';

const ContainerWithOffset = styled(Container)`
  margin-top: 100px;
`;

const menuItems: MenuItem[] = [{
  link: '/baskets',
  name: 'Baskets',
}, {
  link: '/balls',
  name: 'Balls',
}];

type AppProps = {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => (
  <>
    <AppBar menuItems={menuItems} />
    <ContainerWithOffset>
      <>
        {children}
      </>
    </ContainerWithOffset>
  </>
);

export default App;
