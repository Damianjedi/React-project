const express = require("express");

const cors = require("cors");

const User = require('./models/user')

const Kebab = require('./models/kebab')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config()

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
        // Sprawdź unikalność nazwy użytkownika
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "Nazwa użytkownika jest już zajęta" });
        }

        // Jeśli nazwa użytkownika jest unikalna, dodaj użytkownika do bazy danych
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Błąd podczas rejestracji użytkownika:', err);
        res.status(500).json({ message: "Wystąpił błąd podczas rejestracji użytkownika" });
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


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});