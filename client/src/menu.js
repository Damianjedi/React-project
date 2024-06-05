import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./menu.css";
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [newItemData, setNewItemData] = useState({ product: '', Opis: '', Cena: '', imageUrl: '' });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
    setCartItems([...cartItems, {...item, quantity: 1}]);
    }
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

  const handleQuantityChange = (index, value) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = value > 0 ? value : 1;
    setCartItems(newCartItems);
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
      const response = await axios.delete(`http://localhost:3001/menu/${id}`);
      if (response.status === 200) {
      fetchMenuItems();
    } else {
      console.error('Unexpected response status:', response.status);
      fetchMenuItems();
    }
  } catch (error) {
    console.error('Błąd przy usuwaniu produktu:', error.response ? error.response.data : error.message);
    fetchMenuItems();

  }
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + (item.Cena * item.quantity), 0);
    setTotalPrice(total);
  };

  const goToPayment = () => {
    navigate('/payment', { state: { cartItems, totalPrice}});
  };

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
      
      { isAdmin ? (
      <div>
      <h1 id="menutitle">Dodawanie produktu do menu</h1>
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
          id="productImg"
          type="text"
          name="imageUrl"
          placeholder="Adres URL obrazu"
          value={newItemData.imageUrl}
          onChange={handleInputChange}
        />
        <button id="newCart" type="submit">Dodaj</button>
      </form>
      </div>
      ) : (
        <p></p>
      )}

<h2>Menu</h2>
<div className="menu-grid">
    {menuItems.map((item) => (
        <div key={item._id} className="menu-item">
            <div className="menu-item-container">
                <img src={item.imageUrl} alt={item.product} className="product-image" />
                <h3>{item.product}</h3>
                <p>Opis: {item.Opis}</p>
                <p>Cena: {item.Cena} zł</p>
                <div className="button-container">
                    <button id="addCart" onClick={() => addToCart(item)}>Dodaj do koszyka</button>
                    { isAdmin && (
                    <button id="deleteProduct" onClick={() => deleteProduct(item._id)}>Usuń produkt</button>
                    )}
                </div>
            </div>
        </div>
    ))}
</div>


<h2>Koszyk</h2>
<div className="cart-list-grid">
    <div className="cart-list">
        {cartItems.map((item, index) => (
            <li key={index}>
                Produkt: {item.product} | Cena: {item.Cena} zł/szt | Ilość:
                <input 
                    id="numberOfProducts" 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))} 
                />
                <button onClick={() => removeFromCart(index)}>Usuń</button>
            </li>
        ))}
    </div>
</div>

      <h2>Suma do zapłaty: {totalPrice} zł</h2>
      <div className="cart-summary">
      <button id="goToPayment" onClick={goToPayment} disabled={cartItems.length === 0}>Przejdź do podsumowania</button>
      </div>

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

export default Menu;
