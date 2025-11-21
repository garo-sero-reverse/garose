import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Main from './Components/main';
import Use from './Components/use';
import What from './Components/what';
import Sign from './Components/sign';
import Login from './Components/login';
import Sidebar from './Components/sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/use' element={<Use />} />
        <Route path='/what' element={<What />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sidebar' element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
