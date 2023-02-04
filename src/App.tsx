import React from 'react';
import './App.css';
import HeaderComponent from './components/header/HeaderComponent';
import Routes from './Routes';
import { CssVarsProvider } from '@mui/joy/styles';
function App() {
  return (
    <div className="App">
      <CssVarsProvider>      
        <HeaderComponent />
        <Routes />
      </CssVarsProvider>

    </div>
  );
}

export default App;
