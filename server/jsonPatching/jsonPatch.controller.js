'use strict';

import * as common from '../misc/common.js';
import * as strings from '../misc/strings.js';
import jsonpatch from 'jsonpatch';
import logger from '../misc/logger.js';

export function applyJSONPatch(req, res){
	if(common.checkRequiredKeys(req, ['myDoc', 'thePatch'])){
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
	}
	let patchedDoc;
	
	logger.debug(req.body.myDoc);

	try{
		// Will throw error if thePatch is not valid

		patchedDoc = jsonpatch.apply_patch(req.body.myDoc, req.body.thePatch);
	} catch (err) {
		logger.error(err);
		return common.sendResponse(res, 400, null, null, strings.error.SOMETHING);
	}

	// Send patched document
	return common.sendResponse(res, 200, null, {
		patchedDoc
	});
}