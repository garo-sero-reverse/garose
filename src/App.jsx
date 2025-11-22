import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Main from './Components/main';
import Use from './Components/use';
import What from './Components/what';
import SignIn from './Components/signIn';
import Login from './Components/login';
import Sidebar from './Components/sidebar';
import MyPage from './Components/mypage';
import History from './Components/history';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/use' element={<Use />} />
        <Route path='/what' element={<What />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
