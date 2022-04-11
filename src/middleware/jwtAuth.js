/**
 * The JWT authentication middleware
 */

import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const decryptedToken = jwt.verify(token, process.env.TOKEN_SALT);
    req.token = decryptedToken;
    req.role = 'admin';
    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
