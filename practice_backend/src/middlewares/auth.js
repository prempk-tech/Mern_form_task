import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

import config from '../config/config.js';
import ApiError from '../utils/ApiError.js';

export async function auth(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.replace('Bearer', '');
  
      if (!token) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'Please login to your account to preform this action'
        );
      }
  
      const decoded = jwt.verify(token, config.auth.jwtSecretKey);
    }
  
    return next(
      new ApiError(httpStatus.BAD_REQUEST, 'Please login to your account to preform this action')
    );
  }
  