'use strict';
/**
 *  @module Miscelleneous
 */
/**
 *  Send response with given status code and payload.
 *  @return false.
 */
export function sendResponse(res, code, message, data, error) {
	res.status(code).json({
		message,
		error,
		data
	});
	return false;
}

/**
 *  Check required keys for a particular api request.
 *  @return false.
 */
export function checkRequiredKeys(req, keyArr){
	for(let i=0; i<keyArr.length; i++) {
		//logger.info(req.body[keyArr[i]]);
		if(req.body[keyArr[i]] == undefined || req.body[keyArr[i]] == null){
			return true;
		}
	}
	return false;
}