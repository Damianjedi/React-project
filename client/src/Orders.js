import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/orders/${id}`);
      fetchOrders(); // Refresh orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/orders/${id}`, { status: newStatus });
      fetchOrders(); // Refresh orders after status update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
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
              <p><strong>Username:</strong> {order.user.login}</p>

              <div>
                {order.status === 'złożone' && (
                  <button onClick={() => updateOrderStatus(order._id, 'w trakcie przygotowywania')}>
                    Rozpocznij przygotowywanie
                  </button>
                )}
                {order.status === 'w trakcie przygotowywania' && (
                  <button onClick={() => updateOrderStatus(order._id, 'gotowe do odbioru')}>
                    Gotowe
                  </button>
                )}
                {order.status === 'gotowe do odbioru' && (
                  <button onClick={() => deleteOrder(order._id)}>Zamówienie odebrane</button>
                )}
              </div>

              <h4>Zamówienie:</h4>
              <ul>
                {order.cartItems.map((item, index) => (
                  <li key={index}>{item.product} - {item.Opis} - {item.Cena} zł - Ilość: {item.quantity} </li>
                ))}
              </ul>
              <button onClick={() => deleteOrder(order._id)}>Usuń zamówienie</button>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
