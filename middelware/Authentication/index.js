
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log('Decoded Token:', decoded);
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};


module.exports = { authenticate };
