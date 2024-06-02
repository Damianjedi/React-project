import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderStatusClient() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

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
    </div>
  );
}

export default OrderStatusClient;
