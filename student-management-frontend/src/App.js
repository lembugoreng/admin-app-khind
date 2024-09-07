import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StudentRecords from './components/StudentRecords';

function App() {
  const [auth, setAuth] = useState(false);

  return ( // / is the root path /students is the studentrecords page
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} /> 
        {auth && <Route path="/students" element={<StudentRecords />} />}
      </Routes>
    </Router>
  );
}

export default App;
