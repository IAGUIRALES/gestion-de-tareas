const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verifyToken;
