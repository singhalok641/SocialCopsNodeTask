'use strict';
 
let express = require('express');
let  router = express.Router();
 
/**
 *  All Authentication routes
 */
router.post('/', require('./verifyUser.js').verifyUserLogin);
 
export default router;