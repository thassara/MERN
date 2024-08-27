import React, { useState, useEffect } from 'react';

function PaymentformCreditcard() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const districtList = [
        'Galle', 'Colombo', 'Kandy', 'Matara', 'Anuradhapura'
        // Add all districts here
      ];
      setDistricts(districtList);
    };

    fetchDistricts();
  }, []);

  return (
    <div className="payment-UI">
      <h2>Add Payment Section</h2>
      <form className="payment-form">
        <div className="form-Details">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" placeholder="you@example.com" required />
        </div>
        <div className="form-Details">
          <label htmlFor="name">Holder Name</label>
          <input type="text" id="name" placeholder="Card Holder Name" required />
        </div>
        <div className="form-Details">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" placeholder="6362 9700 0045 7013" required />
        </div>
        <div className="form-Details">
          <label htmlFor="expires">Expires</label>
          <input type="text" id="expires" placeholder="MM/YY" required />
        </div>
        <div className="form-Details">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="123" required />
        </div>
        <div className="form-Details">
          <label htmlFor="district">District</label>
          <select id="district" required>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div className="form-Details">
          <label htmlFor="town">Nearest Town</label>
          <input type="text" id="town" placeholder="Your nearest town" required />
        </div>
        <button type="submit" className="payment-button">Make Payment</button>
      </form>
    </div>
  );
}

export default PaymentformCreditcard;
