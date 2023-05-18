import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home.component';
import Navigation from './routes/navigation/navigation.component';

function App() {
  const Shop = () => {
    return <h1>I am the Shop page</h1>;
  }

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Route>
    </Routes>

  )
}

export default App
