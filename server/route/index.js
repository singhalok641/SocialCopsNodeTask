'use strict';

import bodyParser from 'body-parser';

export default function(app) {
	app.use(bodyParser.json());

	app.use('/login', require('../authorization').default);
	app.use('/jsonpatch', require('../jsonPatching'));
	app.use('/thumbnailgeneration', require('../thumbnailGeneration'))
}