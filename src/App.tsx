import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProfilePage from './pages/ProfilePage';
import ProductWigetsPage from './pages/ProductWigetsPage';

const App: React.FC = () => {
  return ( 
      <Routes>
        <Route path="/" element={<ProductWigetsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    
  );
};

export default App;
