import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Balls } from 'containers/Balls';
import { Baskets } from 'containers/Baskets';

export const Routes = () => (
  <Switch>
    <Route path="/baskets" exact component={Baskets} />
    <Route path="/balls" exact component={Balls} />
    <Redirect to="/baskets" />
  </Switch>
);
