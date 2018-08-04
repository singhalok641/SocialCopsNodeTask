'use strict';
/**
 *  @module Thumbnail
 */

import * as common from '../misc/common.js';
import * as strings from '../misc/strings.js';
import logger from '../misc/logger.js';
import config from '../config';
import Jimp from 'jimp';

/**
 *  Takes the image url from request body, resizes it to 50x50 and saves to public/images directory.
 *	Sends the image url in response. In case of wrong image url, sends wrong image url error or internal server  error.
 *  @param {Object} req - Http request object
 *  @param {Object} res - Http response object
 */
export function createThumbnail(req, res) {

	// Return error if the required keys are not in request.
	if(common.checkRequiredKeys(req, ['url']))
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);

	resizeImage(req.body.url)
		.then( url => {
			if(url === null)
				return common.sendResponse(res, 400, null, null, strings.error.WRONG_IMG_URL);

			return common.sendResponse(res, 200, null, config.SERVER + '/images/' + url);
		})
		.catch(function (err) {
			logger.error(err);
			return common.sendResponse(res, 500, null, null, strings.error.INTERNAL_ERROR);
		});
}

/**
 *  resizes image from the given url using Jimp module.
 *  @param {String} url - image url
 *	@return generated image file name.
 */
function resizeImage(url) {
	let fileName = null;
	return Jimp.read(url)
		.then( lenna => {
			if(lenna){
				let now = new Date();
				fileName = 'test_' + now.getTime()+'.jpg';
				return lenna.resize(50, 50).write('public/thumbnails/' + fileName);
			}
			return false;
		})
		.then(() => {
			return fileName;
		});
}
