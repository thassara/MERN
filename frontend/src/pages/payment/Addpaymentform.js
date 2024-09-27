import React, { useState } from 'react';
import axios from 'axios';
import '../../style/payment/PaymentForm.css'; 

const PaymentForm = () => {
  const [paymentType, setPaymentType] = useState('Card Payment');
  const [formData, setFormData] = useState({
    email: '',
    cardHolderName: '',
    cardNumber: '',
    expires: '',
    cvv: '',
    bankName: '',
    remark: '',
    slipFile: null,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, slipFile: e.target.files[0] });
  };

  // Validation Functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  
  const validateCardNumber = (cardNumber) => cardNumber.length === 16 && /^\d+$/.test(cardNumber);
  
  const validateExpiryDate = (expires) => {
    const [month, year] = expires.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return (
      /^\d{2}\/\d{2}$/.test(expires) &&
      parseInt(month, 10) > 0 &&
      parseInt(month, 10) <= 12 &&
      (parseInt(year, 10) > currentYear ||
        (parseInt(year, 10) === currentYear && parseInt(month, 10) >= currentMonth))
    );
  };

  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv); // CVV is typically 3 or 4 digits

  const validateForm = () => {
    let formErrors = {};
    setSubmitError('');

    if (!validateEmail(formData.email)) {
      formErrors.email = 'Email must be in the format: example@gmail.com';
    }

    if (paymentType === 'Card Payment') {
      if (!formData.cardHolderName.trim()) {
        formErrors.cardHolderName = 'Cardholder name is required';
      }
      if (!validateCardNumber(formData.cardNumber)) {
        formErrors.cardNumber = 'Card number must be 16 digits and numeric';
      }
      if (!validateExpiryDate(formData.expires)) {
        formErrors.expires = 'Expiry date must be in the format: MM/YY and in the future';
      }
      if (!validateCVV(formData.cvv)) {
        formErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    if (paymentType === 'Slip Upload') {
      if (!formData.bankName.trim()) {
        formErrors.bankName = 'Bank name is required';
      }
      if (!formData.slipFile) {
        formErrors.slipFile = 'Slip upload is required';
      } else if (!['image/jpeg', 'image/png', 'application/pdf'].includes(formData.slipFile.type)) {
        formErrors.slipFile = 'Only JPEG, PNG, or PDF formats are allowed';
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCardPaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8070/payments/add', {
        email: formData.email,
        cardHolderName: formData.cardHolderName,
        cardNumber: formData.cardNumber,
        expires: formData.expires,
        cvv: formData.cvv,
      });
      alert('Card Payment successful!');
      console.log(response.data);
      setFormData({
        email: '',
        cardHolderName: '',
        cardNumber: '',
        expires: '',
        cvv: '',
        bankName: '',
        remark: '',
        slipFile: null,
      });
      setErrors({});
    } catch (error) {
      console.error('Error during card payment:', error);
      const errorMessage = error.response?.data?.message || 'Unknown error occurred';
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSlipUploadSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const slipData = new FormData();
    slipData.append('bankName', formData.bankName);
    slipData.append('remark', formData.remark);
    slipData.append('slipFile', formData.slipFile);

    try {
      const response = await axios.post('http://localhost:8070/slips/', slipData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Slip uploaded successfully!');
      console.log(response.data);
      setFormData({
        email: '',
        cardHolderName: '',
        cardNumber: '',
        expires: '',
        cvv: '',
        bankName: '',
        remark: '',
        slipFile: null,
      });
      setErrors({});
    } catch (error) {
      console.error('Error uploading slip:', error.response.data);
      setSubmitError('Error uploading slip: ' + (error.response?.data?.message || 'Unknown error occurred'));
    }
  };

  const renderForm = () => {
    if (paymentType === 'Card Payment') {
      return (
        <form className="payment-form" onSubmit={handleCardPaymentSubmit}>
          <h3>Card Payment Details</h3>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cardHolderName">Card Holder Name</label>
            <input
              type="text"
              id="cardHolderName"
              placeholder="Card Holder Name"
              value={formData.cardHolderName}
              onChange={handleChange}
              required
            />
            {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 1234 5678"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expires">Expires (MM/YY)</label>
              <input
                type="text"
                id="expires"
                placeholder="MM/YY"
                value={formData.expires}
                onChange={handleChange}
                required
              />
              {errors.expires && <p className="error">{errors.expires}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </div>
          </div>
          {submitError && <p className="error">{submitError}</p>}
          <button type="submit" className="btn-red" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Make Payment'}
          </button>
        </form>
      );
    } else if (paymentType === 'Slip Upload') {
      return (
        <form className="payment-form" onSubmit={handleSlipUploadSubmit}>
          <h3>Bank Slip Upload</h3>
          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
            {errors.bankName && <p className="error">{errors.bankName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="remark">Remark</label>
            <input
              type="text"
              id="remark"
              placeholder="Remark (Optional)"
              value={formData.remark}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slipFile">Upload Slip</label>
            <input
              type="file"
              id="slipFile"
              onChange={handleFileChange}
              required
            />
            {errors.slipFile && <p className="error">{errors.slipFile}</p>}
          </div>
          {submitError && <p className="error">{submitError}</p>}
          <button type="submit" className="btn-red" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Slip'}
          </button>
        </form>
      );
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Form</h2>
      <div className="payment-type-selector">
        <button
          className={paymentType === 'Card Payment' ? 'active' : ''}
          onClick={() => setPaymentType('Card Payment')}
        >
          Card Payment
        </button>
        <button
          className={paymentType === 'Slip Upload' ? 'active' : ''}
          onClick={() => setPaymentType('Slip Upload')}
        >
          Slip Upload
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default PaymentForm;

