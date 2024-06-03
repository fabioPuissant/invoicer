import React from 'react';

interface Step3Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: any;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange, errors }) => {
    return (
        <div>
            <h2>Recipient Information</h2>
            <div className="form-group">
                <label htmlFor="recipient_name">Recipient Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.recipient_name ? 'is-invalid' : ''}`}
                    id="recipient_name"
                    name="recipient_name"
                    value={formData.recipient_name}
                    onChange={handleChange}
                />
                {errors.recipient_name && <div className="invalid-feedback">{errors.recipient_name}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="recipient_address">Recipient Address</label>
                <input
                    type="text"
                    className={`form-control ${errors.recipient_address ? 'is-invalid' : ''}`}
                    id="recipient_address"
                    name="recipient_address"
                    value={formData.recipient_address}
                    onChange={handleChange}
                />
                {errors.recipient_address && <div className="invalid-feedback">{errors.recipient_address}</div>}
            </div>
        </div>
    );
};

export default Step3;
