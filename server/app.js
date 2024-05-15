const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const User = require('./models/user')

const Kebab = require('./models/kebab')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()

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