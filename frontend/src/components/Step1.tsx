import React from 'react';

interface Step1Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange, errors }) => {
  return (
    <div>
      <h2>Invoice Details</h2>
      <div className="form-group">
        <label htmlFor="invoice_date">Invoice Date</label>
        <input
          type="date"
          className={`form-control ${errors.invoice_date ? 'is-invalid' : ''}`}
          id="invoice_date"
          name="invoice_date"
          value={formData.invoice_date}
          onChange={handleChange}
        />
        {errors.invoice_date && <div className="invalid-feedback">{errors.invoice_date}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="delivery_date">Delivery Date</label>
        <input
          type="date"
          className={`form-control ${errors.delivery_date ? 'is-invalid' : ''}`}
          id="delivery_date"
          name="delivery_date"
          value={formData.delivery_date}
          onChange={handleChange}
        />
        {errors.delivery_date && <div className="invalid-feedback">{errors.delivery_date}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="invoice_number">Invoice Number</label>
        <input
          type="text"
          className={`form-control ${errors.invoice_number ? 'is-invalid' : ''}`}
          id="invoice_number"
          name="invoice_number"
          value={formData.invoice_number}
          onChange={handleChange}
        />
        {errors.invoice_number && <div className="invalid-feedback">{errors.invoice_number}</div>}
      </div>
    </div>
  );
};

export default Step1;
