import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [newItemData, setNewItemData] = useState({ product: '', Opis: '', Cena: '', imageUrl: '' });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const validateNumberInput = (event) => {
    const keyCode = event.keyCode || event.which;
    if (!(keyCode === 8 || keyCode === 9 || keyCode === 46 || (keyCode >= 37 && keyCode <= 40))) {
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/menu'); 
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData({ ...newItemData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3001/menu', newItemData);
        setNewItemData({ product: '', Opis: '', Cena: '', imageUrl: ''});
        fetchMenuItems();
    } catch (error) {
        console.error('Błąd przy dodawaniu produktów', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Błąd przy usuwaniu produktu', error);
    }
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.Cena), 0);
    setTotalPrice(total);
  };

  return (
    <div>
      <h1>Dodawanie produktu do menu (admin)</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          id="productName"
          type="text"
          name="product"
          placeholder="Nazwa produktu"
          value={newItemData.product}
          onChange={handleInputChange}
          required
        />
        <input
          id="productDesc"
          type="text"
          name="Opis"
          placeholder="Opis"
          value={newItemData.Opis}
          onChange={handleInputChange}
          required
        />
        <input
          id="productPrice"
          type="text"
          name="Cena"
          placeholder="Cena"
          value={newItemData.Cena}
          onChange={handleInputChange}
          onKeyDown={validateNumberInput}
          required
        />
        <input
          id="productImage"
          type="text"
          name="imageUrl"
          placeholder="Adres URL"
          value={newItemData.imageUrl}
          onChange={handleInputChange}
          required
        />
        <button id="newCart" type="submit">Dodaj Produkt</button>
      </form>

      <h2>Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item">
            <img src={item.imageUrl} alt={item.product} className="product-image" />
            <h3>{item.product}</h3>
            <p>Opis: {item.Opis}</p>
            <p>Cena: {item.Cena} zł</p>
            <button id="addCart" onClick={() => addToCart(item)}>Dodaj do koszyka</button> 
            <button id="deleteProduct" onClick={() => deleteProduct(item._id)}>Usuń produkt</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <div className="cart-grid">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.product} className="product-image" />
            <h3>{item.product}</h3>
            <p>Cena: {item.Cena} zł</p>
            <button id="removeCart" onClick={() => removeFromCart(index)}>Usuń</button>
          </div>
        ))}
      </div>
      <h2>Suma do zapłacenia: {totalPrice.toFixed(2)} zł</h2>
    </div>
  );
}

export default Menu;
