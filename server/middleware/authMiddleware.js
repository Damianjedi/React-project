const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Replace with your actual User model

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded:', decoded);

      req.user = await User.findById(decoded.id); // Find the user by ID
      console.log('User:', req.user);

      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = authMiddleware;
