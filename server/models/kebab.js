const mongoose = require('mongoose');


const kebabSchema = new mongoose.Schema({
  product: { type: String, required: true },
  Opis: { type: String, required: true },
  Cena: {type: Number},
  imageUrl: {type: String},
});

const Kebab = mongoose.model('Kebab', kebabSchema);

module.exports = Kebab;