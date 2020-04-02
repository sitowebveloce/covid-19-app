import React from 'react';
import Nav from './Component/Nav';
import Footer from './Component/Footer';
import './App.css';
import CardWrapper from './Component/CardWrapper';

function App() {
  return (
    <>
     <Nav />
    <div className="App">
     <CardWrapper />
     <Footer />
    </div>
    </>
  );
}

export default App;
