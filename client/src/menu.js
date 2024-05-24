import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [newItemData, setNewItemData] = useState({ product: '', Opis: '', Cena: '' });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const validateNumberInput = (event) => {
    const keyCode = event.keyCode || event.which;
  
    if (
      !(
        keyCode === 8 ||
        keyCode === 9 ||
        keyCode === 46 ||
        (keyCode >= 37 && keyCode <= 40)
      )
    ) {
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
        setNewItemData({ product: '', Opis: '', Cena: ''});
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
    const total = cartItems.reduce((acc, item) => acc + item.Cena, 0);
    setTotalPrice(total);
  }

  return (
    <div>
      <h1>Dodawanie produktu do menu (admin)</h1>
      <form onSubmit={handleSubmit}>
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
          placeholder="Opis produktu"
          value={newItemData.Opis}
          onChange={handleInputChange}
          required
        />
        <input
          id="productPrice"
          type="text"
          name="Cena"
          placeholder="Price"
          value={newItemData.Cena}
          onChange={handleInputChange}
          onKeyDown={validateNumberInput}
          required
        />
        <button id="newCart" type="submit">Dodaj Kebaba</button>
      </form>

      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            {item.product} - Opis: {item.Opis} - Cena: {item.Cena} zł
            <button id="addCart" onClick={() => addToCart(item)}>Dodaj do koszyka</button> 
            <button id="deleteProduct" onClick={() => deleteProduct(item._id)}>Usuń produkt</button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li 
            key={index}>{item.product} - Cena: {item.Cena} zł
            <button id="removeCart" onClick={() => removeFromCart(index)}>Usuń</button>
          </li>
        ))}
      </ul>
      <h2>Suma do zapłacenia: {totalPrice} zł</h2>
    </div>
  );
}

export default Menu;
