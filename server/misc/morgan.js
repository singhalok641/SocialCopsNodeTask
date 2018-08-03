'use strict';
 
var morgan = require('morgan');
var config = require('../config');
 
// API Request logger - only in development
export default function(app) {
  if(config.ENV == 'development')
    app.use(morgan('dev'));
}