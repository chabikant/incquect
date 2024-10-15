// src/App.js

import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import AdminView from './components/AdminView';
import UserView from './components/UserView';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/user" element={<UserView />} />
      </Routes>
    </Router>
  );
};

export default App;
