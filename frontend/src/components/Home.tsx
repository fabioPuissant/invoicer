import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Invoice Generator</h1>
      <p>Create and manage your invoices with ease.</p>
      <Link to="/create-invoice" className="btn btn-primary">Create Invoice</Link>
      <Link to="/plan" className="btn btn-secondary ml-2">View Plan</Link>
    </div>
  );
}

export default Home;
