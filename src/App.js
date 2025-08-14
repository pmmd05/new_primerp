import logo from './logo.svg';
import './App.css';
import React from 'react';
import FormularioLogin from './components/FormularioLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <FormularioLogin />
      </header>
    </div>
  );
}

export default App;