import React from 'react';

interface Step2Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange, errors }) => {
  return (
    <div>
      <h2>Your Information</h2>
      <div className="form-group">
        <label htmlFor="your_name">Your Name</label>
        <input
          type="text"
          className={`form-control ${errors.your_name ? 'is-invalid' : ''}`}
          id="your_name"
          name="your_name"
          value={formData.your_name}
          onChange={handleChange}
        />
        {errors.your_name && <div className="invalid-feedback">{errors.your_name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="your_address">Your Address</label>
        <input
          type="text"
          className={`form-control ${errors.your_address ? 'is-invalid' : ''}`}
          id="your_address"
          name="your_address"
          value={formData.your_address}
          onChange={handleChange}
        />
        {errors.your_address && <div className="invalid-feedback">{errors.your_address}</div>}
      </div>
    </div>
  );
};

export default Step2;
