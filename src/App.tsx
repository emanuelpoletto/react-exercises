import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import List from './pages/List';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <header className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className='App-link'
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn React
              </a>
            </header>
          </Route>
          <Route path='/list' component={List}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
