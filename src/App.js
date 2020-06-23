import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path='/items' component={SearchPage} />
        <Route path='/item/:id' component={ProductPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
