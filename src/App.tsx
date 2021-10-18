import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';

import Routes from './Routes';

import './App.global.css';

export default function App() {
  const history = useHistory();
  useEffect(() => {
    history.push('/');
  },[]);

  return (
    <Switch>
      <Routes/>
    </Switch>
  );
}
