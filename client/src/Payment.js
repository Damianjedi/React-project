import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



function Payment() {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  const [token, setToken] = useState('');


  const [orderType, setOrderType] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState({name:'', phone: ''});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  }

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    if (name === 'tableNumber') {
        setTableNumber(value);
    } else if (name === 'address') {
        setAddress(value);
    }else {
        setContactInfo({ ...contactInfo, [name]: value});
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      orderType,
      tableNumber: orderType === 'na miejscu' ? tableNumber : null,
      address: orderType === 'dostawa' ? address : null,
      contactInfo,
      paymentMethod,
      cartItems,
      totalPrice,
      username,
      
    };
    console.log('Order Details:', orderDetails);
    try {
        // Send the order details to the server
        const response = await axios.post('http://localhost:3001/orders', orderDetails, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        console.log('Order submitted successfully:', response.data);
        // You can add further actions here, like redirecting the user or showing a success message
      } catch (error) {
        console.error('Error submitting order:', error);
        console.error('Response data:', error.response.data);
      }
  };

  return (
    <div>
      <h2>Summary</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.product} - Cena: {item.Cena} zł - Ilość: {item.quantity}</li>
        ))}
      </ul>
      <h2>Total Price: {totalPrice} zł</h2>

      <h3>Szczegóły zamówienia</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Typ zamówienia:
            <select name="orderType" value={orderType} onChange={handleOrderTypeChange} required>
              <option value="">Wybierz</option>
              <option value="na miejscu">Na miejscu</option>
              <option value="odbior wlasny">Odbiór własny</option>
              <option value="dostawa">Dostawa</option>
            </select>
          </label>
        </div>
        
        {orderType === 'na miejscu' && (
          <div>
            <label>
              Numer stolika:
              <input
                type="text"
                name="tableNumber"
                value={tableNumber}
                onChange={handleInputChange}
                required={orderType === 'na miejscu'}
              />
            </label>
          </div>
        )}
        
        {orderType === 'dostawa' && (
          <div>
            <label>
              Adres:
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleInputChange}
                required={orderType === 'dostawa'}
              />
            </label>
          </div>
        )}
        
        <div>
          <label>
            Imię:
            <input
              type="text"
              name="name"
              value={contactInfo.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        
        <div>
          <label>
            Numer telefonu:
            <input
              type="text"
              name="phone"
              value={contactInfo.phone}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        
        <div>
          <label>
            Metoda Płatności:
            <select name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} required>
              <option value="">Wybierz</option>
              <option value="cash">Gotówka</option>
              <option value="card">Karta</option>
              <option value="online">Online</option>
            </select>
          </label>

         </div>
        
        <button type="submit">Zamów</button>
      </form>
    </div>
  );
}

export default Payment;