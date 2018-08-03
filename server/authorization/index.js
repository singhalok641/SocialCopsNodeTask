'use strict';
 
let express = require('express');
let  router = express.Router();
 
/**
 *  All Authentication routes
 */
router.use('/', require('./verifyUser.js').verifyUserLogin);
 
export default router;