'use strict';

import { Router } from 'express';
import { authenticate } from '../authorization/authorization.js';
import * as controller from './jsonPatch.controller.js';

let	router = new Router();
/**
 *  JSON Patch Route
 */
router.patch('/applyPatch', authenticate(), controller.applyJSONPatch);
 
module.exports = router;