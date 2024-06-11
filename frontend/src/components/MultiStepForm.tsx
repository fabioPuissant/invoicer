import React, { useState } from 'react';
import axios from 'axios';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    invoice_date: '',
    delivery_date: '',
    invoice_number: '',
    company_name: '',
    company_address: '',
    company_email: '',
    company_phone: '',
    vat_number: '',
    client_number: '',
    recipient_name: '',
    recipient_address: '',
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

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  function validateDate(name: string, dateStr: string, newErrors: any) {
    try {
      new Date(dateStr);
    } catch (e) {
      newErrors[name] = "Not a valid date"
    }
  }

  const validate = () => {
    const newErrors: any = {};
    if (currentStep === 1) {
      if (!formData.invoice_date) newErrors.invoice_date = 'Invoice Date is required';
      if (formData.invoice_date) validateDate('invoice_date', formData.invoice_date, newErrors);
      if (!formData.delivery_date) newErrors.delivery_date = 'Delivery Date is required';
      if (formData.delivery_date) validateDate('delivery_date', formData.delivery_date, newErrors);
      if (!formData.invoice_number) newErrors.invoice_number = 'Invoice Number is required';
      if (formData.invoice_date && formData.delivery_date) {
        const invoiceDate = new Date(formData.invoice_date)
        const deliveryDate = new Date(formData.delivery_date)
        if (deliveryDate < invoiceDate) {
          newErrors.delivery_date = "Delivery date cannot be before invoice date"
        }
      }
    } else if (currentStep === 2) {
      if (!formData.company_name) newErrors.company_name = 'Company Name is required';
      if (!formData.company_address) newErrors.company_address = 'Company Address is required';
      if (!formData.company_email) newErrors.company_email = 'Company Email is required';
      if (!formData.company_phone) newErrors.company_phone = 'Company Phone is required';
      if (!formData.vat_number) newErrors.vat_number = 'VAT Number is required';
      if (!formData.client_number) newErrors.client_number = 'Client Number is required';
    } else if (currentStep === 3) {
      if (!formData.recipient_name) newErrors.recipient_name = 'Recipient Name is required';
      if (!formData.recipient_address) newErrors.recipient_address = 'Recipient Address is required';
    } else if (currentStep === 4) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.quantity) newErrors.quantity = 'Quantity is required';
      if (!formData.unit_price) newErrors.unit_price = 'Unit Price is required';
      if (!formData.amount_excl_vat) newErrors.amount_excl_vat = 'Amount (excl. VAT) is required';
      if (!formData.vat_rate) newErrors.vat_rate = 'VAT Rate is required';
      if (!formData.vat_amount) newErrors.vat_amount = 'VAT Amount is required';
      if (!formData.total_amount) newErrors.total_amount = 'Total Amount is required';
    } else if (currentStep === 5) {
      if (!formData.place_of_invoice) newErrors.place_of_invoice = 'Place of Invoice is required';
      if (!formData.payment_terms) newErrors.payment_terms = 'Payment Terms are required';
    }
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validate()) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Validation failed:', errors);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3001/generate_invoice', formData, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('There was an error generating the invoice!', error);
      }
    } else {
      console.log('Validation failed on submit:', errors);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 4 && <Step4 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 5 && <Step5 formData={formData} handleChange={handleChange} errors={errors} />}

        <div className="mt-4">
          {currentStep > 1 && <button type="button" className="btn btn-secondary mr-2" onClick={prevStep}>Previous</button>}
          {currentStep < 5 && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
          {currentStep === 5 && <button type="submit" className="btn btn-success">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
