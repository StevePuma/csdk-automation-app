// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import NavPanel from './components/NavPanel';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Box display="flex">
        <NavPanel />
        <Box component="main" flexGrow={1} p={3} style={{ marginTop: '64px', marginLeft: '260px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
