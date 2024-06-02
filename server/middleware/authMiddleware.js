const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401); // Unauthorized

  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  const parts = token.split('-');
  if (parts.length !== 2 || parts[0] !== 'user') {
    return res.sendStatus(400); // Bad Request
  }

  const userId = parts[1];
  req.userId = userId;
  next();
};

module.exports = authenticateToken;

