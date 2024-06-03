import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    invoice_date: '',
    delivery_date: '',
    invoice_number: '',
    your_name: '',
    your_address: '',
    recipient_name: '',
    recipient_address: '',
    bank_account_number: '',
    vat_number: '',
    description: '',
    quantity: '',
    unit_price: '',
    discount: '',
    amount_excl_vat: '',
    vat_rate: '',
    vat_amount: '',
    total_amount: '',
    place_of_invoice: '',
    payment_terms: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/generate_invoice', formData, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('There was an error generating the invoice!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
            <input
              type="text"
              className="form-control"
              id={key}
              name={key}
              value={(formData as any)[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Generate Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
