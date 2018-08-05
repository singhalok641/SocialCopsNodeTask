'use strict';
 
let express = require('express');
let  router = express.Router();
 
/**
 *	JWT Authentication route
 */
router.post('/', require('./verifyUser.js').verifyUserLogin);
 
export default router;