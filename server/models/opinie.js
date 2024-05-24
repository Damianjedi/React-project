const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
  text: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // Referencja do modelu użytkownika
});

const Opinion = mongoose.model('Opinion', opinionSchema);

module.exports = Opinion;