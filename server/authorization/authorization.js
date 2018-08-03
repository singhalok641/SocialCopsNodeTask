'use strict';
 
import jwt from 'jsonwebtoken';
import config from '../config';
import strings from '../misc/strings.js';
import common from '../misc/common.js';
import logger from '../misc/logger.js';
 
/**
 *  Sign a token with given payload
 *  @param {Object} payloadData -  data object which is to be added in token(payload).
 *  @return token.
 */
export function signToken(payloadData) {
 
  return jwt.sign(payloadData, config.JWT_SECRET, { expiresIn: 5*60*60 });
}
 
/**
 *  Authenticates the authorization token and let the user pass only if authenticated otherwise sends error.
 *  @return Middleware.
 */
export function authenticate() {
  
  return (req, res, next) => {
 
    //  Check token in request header
    if(!req.headers.authorization)
      return common.sendResponse(res, 403, null, null, strings.error.MISSING_TOKEN);
 
    //  Check if the token is valid and decode and add details to req.user
    if(!validateToken(req)){
      logger.debug('auth token is not verified.');
      return common.sendResponse(res, 403, null, null, strings.error.JWT_FAILURE);
    }
    //  Check if the token is valid and decode and add details to req.user
    if(req.user.type !== strings.SC_TYPE)
      return common.sendResponse(res, 403, null, null, strings.error.AUTH_ERROR);
 
    next();
  };
}
 
/**
 *  Check if the token is valid and decode and add details to req.user
 *  @return Boolean.
 */
function validateToken(req) {
  try {
    var decodedData = jwt.verify(req.headers.authorization, config.JWT);
    req.user = decodedData;
    return true;
  } catch(err) {
    return false;
  }
}