import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import './Header.css'
import SubNav from './SubNav';
import Results from './Results';
import requests from './request';
function App() {
  const [selectedOption, setSelectedOption] = useState(requests.fetchTrending)
  return (
    <div className="app">
      <Header />

      <SubNav setSelectedOption={setSelectedOption} />

      <Results selectedOption={selectedOption} />
    </div>
  );
}

export default App;
