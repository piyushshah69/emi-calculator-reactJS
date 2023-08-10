import React, { useState } from 'react';
import Header from './components/Header';
import './index.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <Header />
      <Calculator />
    </div>
  );
}

export default App;
