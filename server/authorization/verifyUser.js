'use strict';
 
import * as authorizationService from './authorization.js';
import * as strings from '../misc/strings.js';
import * as common from '../misc/common.js';
 
/**
 *Mock authentication service - Verifies any user login with a username and a password field
  @return JWT token.
 */
export function verifyUserLogin(req, res) {
 
	// Checks necessary fields - username and password
	if(!(req.body.username && req.body.password))
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
 
	let token = authorizationService.signToken({
		type : strings.SC_TYPE,
		user : req.body.username
	});
 
	return common.sendResponse(res, 200, null, {
		token
	});
}