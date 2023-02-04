import React from 'react';
import './App.css';
import HeaderComponent from './components/header/HeaderComponent';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes />
    </div>
  );
}

export default App;
