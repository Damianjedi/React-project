import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./payment.css";



function Payment() {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  const [token, setToken] = useState('');
  const navigate = useNavigate()


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
        navigate('/yourorderstatus')
        // You can add further actions here, like redirecting the user or showing a success message
      } catch (error) {
        console.error('Error submitting order:', error);
        console.error('Response data:', error.response.data);
      }
  };

  return (
    <div className="summary-root-div">

<nav className="navbar">
        <div className="left-items">
            <a href="home">Home</a>
            <a href="menu">Menu</a>
            <a href="opinie">Oceny</a>
            <a href="orders">Zamówienia</a>
        </div>
        <div className="right-items">
            <a href="login">Logowanie</a>
            <a href="register">Rejestracja</a>
        </div>
        </nav>
        
      <h2>Podsumowanie</h2>
      <div className="summary-cart-list-grid">
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>Produkt: {item.product} | Cena: {item.Cena} zł/szt | Ilość: {item.quantity}</li>
        ))}
      </ul>
      </div>
      <h2>Suma: {totalPrice} zł</h2>

      <h3>Szczegóły zamówienia</h3>
      <form onSubmit={handleSubmit} className="summary-add-product-form">
        <div>
          <label>
            <select name="orderType" value={orderType} onChange={handleOrderTypeChange} required>
              <option value=""> Typ zamówienia</option>
              <option value="na miejscu">Na miejscu</option>
              <option value="odbior wlasny">Odbiór własny</option>
              <option value="dostawa">Dostawa</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            <select name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} required>
              <option value="">Metoda płatnosci</option>
              <option value="cash">Gotówka</option>
              <option value="card">Karta</option>
              <option value="online">Online</option>
            </select>
          </label>

         </div>
        
        {orderType === 'na miejscu' && (
          <div>
            <label>
              <input
                type="text"
                name="tableNumber"
                placeholder="Numer stolika"
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
              <input
                type="text"
                name="address"
                placeholder="Adres"
                value={address}
                onChange={handleInputChange}
                required={orderType === 'dostawa'}
              />
            </label>
          </div>
        )}

        
        <div>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Imie"
              value={contactInfo.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        
        <div>
          <label>
            <input
              type="text"
              name="phone"
              placeholder="Numer telefonu"
              value={contactInfo.phone}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
      
        
        <button type="submit">Zamów</button>
      </form>

      <footer class="footer">
<p class="copyright">
    KEBABEE Copyright 
    <span class="year">© 2024</span> - 
    All rights reserved
</p>
</footer>
    </div>
  );
}

export default Payment;