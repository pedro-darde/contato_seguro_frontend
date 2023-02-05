import React from 'react';
import './App.css';
import HeaderComponent from './components/header/HeaderComponent';
import Routes from './Routes';
import { CssVarsProvider } from '@mui/joy/styles';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <CssVarsProvider>      
        <HeaderComponent />
        <Routes />
        <ToastContainer />
      </CssVarsProvider>
    </div>
  );
}

export default App;
