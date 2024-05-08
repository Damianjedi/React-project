const mongoose = require('mongoose');

const roles = {
    USER: 1,
    ADMIN: 2
}

const userSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roleId: {type: Number, default: roles.USER},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
