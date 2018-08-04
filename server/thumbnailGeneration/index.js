'use strict';

import { Router } from 'express';
import { authenticate } from '../authorization/authorization.js';
import * as controller from './thumbnailGeneration.controller.js';

let	router =new Router();

// All routes related to thumbnail
router.post('/generate', authenticate(), controller.createThumbnail);

module.exports = router;