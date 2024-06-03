import React from 'react';

interface Step4Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const Step4: React.FC<Step4Props> = ({ formData, handleChange, errors }) => {
  return (
    <div>
      <h2>Item Details</h2>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="unit_price">Unit Price</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.unit_price ? 'is-invalid' : ''}`}
          id="unit_price"
          name="unit_price"
          value={formData.unit_price}
          onChange={handleChange}
        />
        {errors.unit_price && <div className="invalid-feedback">{errors.unit_price}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.discount ? 'is-invalid' : ''}`}
          id="discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
        {errors.discount && <div className="invalid-feedback">{errors.discount}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="amount_excl_vat">Amount (excl. VAT)</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.amount_excl_vat ? 'is-invalid' : ''}`}
          id="amount_excl_vat"
          name="amount_excl_vat"
          value={formData.amount_excl_vat}
          onChange={handleChange}
        />
        {errors.amount_excl_vat && <div className="invalid-feedback">{errors.amount_excl_vat}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="vat_rate">VAT Rate</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.vat_rate ? 'is-invalid' : ''}`}
          id="vat_rate"
          name="vat_rate"
          value={formData.vat_rate}
          onChange={handleChange}
        />
        {errors.vat_rate && <div className="invalid-feedback">{errors.vat_rate}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="vat_amount">VAT Amount</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.vat_amount ? 'is-invalid' : ''}`}
          id="vat_amount"
          name="vat_amount"
          value={formData.vat_amount}
          onChange={handleChange}
        />
        {errors.vat_amount && <div className="invalid-feedback">{errors.vat_amount}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="total_amount">Total Amount</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.total_amount ? 'is-invalid' : ''}`}
          id="total_amount"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleChange}
        />
        {errors.total_amount && <div className="invalid-feedback">{errors.total_amount}</div>}
      </div>
    </div>
  );
};

export default Step4;
