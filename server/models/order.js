const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderType: {
    type: String,
    required: true
  },
  tableNumber: {
    type: String,
    required: function() {
      return this.orderType === 'on-site';
    }
  },
  address: {
    type: String,
    required: function() {
      return this.orderType === 'delivery';
    }
  },
  contactInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  cartItems: [{
    product: {
      type: String,
      required: true
    },
    Opis: {
      type: String,
      required: true
    },
    Cena: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'złożone',
    enum: ['złożone', 'w trakcie przygotowywania', 'gotowe do odbioru']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
});

module.exports = mongoose.model('Order', OrderSchema);