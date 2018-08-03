'use strict';

import express from 'express';
import http from 'http';
import config from './config'; 
import logger from './misc/logger.js'; 

//server setup
var app = express();
var server = http.createServer(app); 

//middleware 
require('./misc/morgan.js').default(app); 
 

require('./route').default(app); 
 
// Start server 
function startServer() { 
  server.listen(config.PORT, config.HOST, function() { 
    logger.log('info', 'server started on %d, in %s mode...', config.PORT, config.ENV); 
  }); 
} 
 
setImmediate(startServer); 
 
// Expose app 
exports = module.exports = app; 
