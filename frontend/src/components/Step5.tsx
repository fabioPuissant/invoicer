import React from 'react';

interface Step5Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const Step5: React.FC<Step5Props> = ({ formData, handleChange, errors }) => {
  return (
    <div>
      <h2>Additional Information</h2>
      <div className="form-group">
        <label htmlFor="place_of_invoice">Place of Invoice</label>
        <input
          type="text"
          className={`form-control ${errors.place_of_invoice ? 'is-invalid' : ''}`}
          id="place_of_invoice"
          name="place_of_invoice"
          value={formData.place_of_invoice}
          onChange={handleChange}
        />
        {errors.place_of_invoice && <div className="invalid-feedback">{errors.place_of_invoice}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="payment_terms">Payment Terms</label>
        <input
          type="text"
          className={`form-control ${errors.payment_terms ? 'is-invalid' : ''}`}
          id="payment_terms"
          name="payment_terms"
          value={formData.payment_terms}
          onChange={handleChange}
        />
        {errors.payment_terms && <div className="invalid-feedback">{errors.payment_terms}</div>}
      </div>
    </div>
  );
};

export default Step5;
