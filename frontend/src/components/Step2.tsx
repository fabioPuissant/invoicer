import React from 'react';

interface Step2Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: any;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange, errors }) => {
    return (
        <div>
            <h2>Company Information</h2>
            <div className="form-group">
                <label htmlFor="company_name">Company Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.company_name ? 'is-invalid' : ''}`}
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                />
                {errors.company_name && <div className="invalid-feedback">{errors.company_name}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="company_address">Company Address</label>
                <input
                    type="text"
                    className={`form-control ${errors.company_address ? 'is-invalid' : ''}`}
                    id="company_address"
                    name="company_address"
                    value={formData.company_address}
                    onChange={handleChange}
                />
                {errors.company_address && <div className="invalid-feedback">{errors.company_address}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="company_email">Company Email</label>
                <input
                    type="email"
                    className={`form-control ${errors.company_email ? 'is-invalid' : ''}`}
                    id="company_email"
                    name="company_email"
                    value={formData.company_email}
                    onChange={handleChange}
                />
                {errors.company_email && <div className="invalid-feedback">{errors.company_email}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="company_phone">Company Phone</label>
                <input
                    type="text"
                    className={`form-control ${errors.company_phone ? 'is-invalid' : ''}`}
                    id="company_phone"
                    name="company_phone"
                    value={formData.company_phone}
                    onChange={handleChange}
                />
                {errors.company_phone && <div className="invalid-feedback">{errors.company_phone}</div>}
            </div>
        </div>
    );
};

export default Step2;
