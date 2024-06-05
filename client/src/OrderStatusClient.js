import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderStatusClient() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [token, setToken] = useState('');



  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const adminStatus = localStorage.getItem("isAdmin");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
    if (adminStatus) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    // Usuwanie konkretnych kluczy z localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    
    // Usuwanie wszystkich danych z localStorage
    localStorage.clear();
    
    // Usuwanie wszystkich danych z sessionStorage
    sessionStorage.clear();
    
    // Usuwanie cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    });
    window.location.href = '/home';
  };



  useEffect(() => {
    fetchUserOrders();
    
  }, []);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const response = await axios.get('http://localhost:3001/orders/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders');
    }
  };

  return (
    <div>

<nav className="navbar">
        <div className="left-items">
          <a href="home">Home</a>
          <a href="menu">Menu</a>
          <a href="opinie">Oceny</a>
          {isLoggedIn && isAdmin && <a href="orders">Zamówienia</a>}
          {isLoggedIn && <a href="yourorderstatus">Twoje zamówienia</a>}
        </div>
        <div className="right-items">
          {isLoggedIn ? (
            <a href="home" onClick={handleLogout}>
              Wyloguj
            </a>
          ) : (
            <>
              <a href="login">Logowanie</a>
              <a href="register">Rejestracja</a>
            </>
          )}
        </div>
      </nav>
        
      <h2>Twoje zamówienia</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <div>
              <p><strong>Typ zamówienia:</strong> {order.orderType}</p>
              {order.tableNumber && <p><strong>Numer stolika:</strong> {order.tableNumber}</p>}
              {order.address && <p><strong>Adres:</strong> {order.address}</p>}
              <p><strong>Kontakt:</strong> {order.contactInfo.name} - {order.contactInfo.phone}</p>
              <p><strong>Metoda płatności:</strong> {order.paymentMethod}</p>
              <p><strong>Cena:</strong> {order.totalPrice} zł</p>
              <p><strong>Godzina zamówienia:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <h4>Zamówienie:</h4>
              <ul>
                {order.cartItems.map((item, index) => (
                  <li key={index}>{item.product} - {item.Opis} - {item.Cena} zł - Ilość: {item.quantity}</li>
                ))}
              </ul>
            </div>
            <hr />
          </li>
        ))}
      </ul>

      <footer className="footer">
<p className="copyright">
    KEBABEE Copyright 
    <span className="year">© 2024</span> - 
    All rights reserved
</p>
</footer>
    </div>
  );
}

export default OrderStatusClient;
