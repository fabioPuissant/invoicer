import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Plan from './components/Plan';
import MultiStepForm from './components/MultiStepForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/create-invoice" element={<MultiStepForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
