import jwt from 'jsonwebtoken';
import { als } from '../configs/context.js'

export const userContextMiddleware = (req, res, next) => {
  const token = req.cookies?.jwt_cpic
  let isAuthenticated = false;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      user = decoded.id;
      isAuthenticated = true;
    } catch (err) {
      // Token is invalid, continue as unauthenticated
      console.error('Invalid JWT, proceeding as unauthed user', err);
    }
  }
  //console.log('user is unathenticated');
  // Set the authentication status in the AsyncLocalStorage context
  als.run({ isAuthenticated, user }, () => next());
};