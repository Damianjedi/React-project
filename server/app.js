const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const User = require('./models/user')

const Kebab = require('./models/kebab')

const Opinion = require('./models/opinie');

const Order = require('./models/order');

const crypto = require('crypto');


const PORT = process.env.PORT || 3001;

const app = express();

const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()

const authenticateToken = require('./middleware/authMiddleware');


// i o co biega
//ogl to jak się user rejestruje i jest pusta baza danych to git
//ale jak już jednego się zarejestruje i próbuje się następnych to wyskakuje błąd

//AxiosError

const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@react.iuhwkob.mongodb.net/${process.env.DB_NAME}`)
.then(() => {
    console.log('Połączono z bazą danych');
  })
  .catch((err) => {
    console.error('Błąd połączenia z bazą danych:', err);
  });

  app.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ login: req.body.login });
        if (existingUser) {
            return res.status(400).json({ message: "Nazwa użytkownika jest już zajęta" });
        }

        const user = new User ({
          login: req.body.login,
          password: req.body.password,
        });
      const newUser = await User.create({
        login: req.body.login,
        password: req.body.password,
});
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Błąd podczas rejestracji użytkownika:', err);
        res.status(500).json({ message: "Wystąpił błąd podczas rejestracji użytkownika" });
    }
});

function hashLogin(login) {
  return crypto.createHash('sha256').update(login).digest('hex');
}

app.post('/login', async (req, res) => {
  try {
      const { login, password } = req.body;
      
      // Sprawdzanie, czy użytkownik istnieje w bazie danych
      const user = await User.findOne({ login });

      if (!user) {
          return res.status(400).json({ message: "Nieprawidłowy login lub hasło." });
      }

      // Sprawdzanie poprawności hasła
      if (user.password !== password) {
          return res.status(400).json({ message: "Nieprawidłowy login lub hasło" });
      }

      const token = `user-${user._id}`;

      if (user.roleId === 2) {
        res.status(200).json({ id: user.roleId, login: user.login, isAdmin: true, token });
    } else {
        // Jeśli użytkownik nie jest administratorem, zwróć standardowy status 200
        res.status(200).json({ id: user.roleId, login: user.login, token });
    }

  } catch (err) {
      console.error('Błąd podczas logowania użytkownika:', err);
      res.status(500).json({ message: "Wystąpił błąd podczas logowania użytkownika" });
  }
});


app.get('/menu', async (req, res) => {
  try {
    const menuItems = await Kebab.find();
    res.json(menuItems);
  } catch (error) {
    console.error('Błąd przy fetchowaniu kebabów', error);
    res.status(500).json({message:'Internal server error'});
  }
});

app.post('/menu', async (req, res) => {
  try {
    const { product, Opis, Cena } = req.body;
    const newItem = new Kebab({ product, Opis, Cena });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/menu/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Kebab.findByIdAndDelete(id);
    res.status(200).send('Produkt został pomyślnie usunięty.');
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error);
    res.status(500).send('Wystąpił błąd podczas usuwania produktu.');
  }
});


app.get('/opinions', async (req, res) => {
  try {
    const opinions = await Opinion.find().populate('user', 'login'); // Pobranie opinii wraz z danymi użytkownika (tylko login)
    res.json(opinions);
  } catch (error) {
    console.error('Błąd przy pobieraniu opinii:', error);
    res.status(500).json({ message: 'Wystąpił błąd przy pobieraniu opinii' });
  }
});

app.post('/opinions', authenticateToken, async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Nie znaleziono użytkownika' });
    }

    const newOpinion = new Opinion({
      text,
      user: userId,
    });

    const savedOpinion = await newOpinion.save();
    res.status(201).json(savedOpinion);
  } catch (error) {
    console.error('Błąd przy dodawaniu opinii:', error);
    res.status(500).json({ message: 'Wystąpił błąd przy dodawaniu opinii' });
  }
});

app.post('/orders', authenticateToken, async (req, res) => {
  const { orderType, tableNumber, address, contactInfo, paymentMethod, cartItems, totalPrice } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Nie znaleziono użytkownika' });
    }

  const newOrder = new Order({
    orderType,
    tableNumber,
    address,
    contactInfo,
    paymentMethod,
    cartItems,
    totalPrice,
    status: 'złożone',
    user,
    
  });


  
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save order' });
  
  }
});


app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'login');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Delete an order
app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

app.put('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

app.get('/orders/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId }).populate('user', 'login');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});