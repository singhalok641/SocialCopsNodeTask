'use strict';
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