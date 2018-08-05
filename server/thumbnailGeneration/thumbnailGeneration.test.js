'use strict';
/**
 *	Test cases related to thumbnail.
 */
let app = require('../');
let config = require('../config');
let request = require('supertest');
let assert = require('chai').assert;
/**
 *	Write all the possible test cases related to patch module inside below describe block.
 */
describe('Thumbnail APIs:', function() {
	// Store logged in user details to reuse in the next apis.
	let loggedInUser;
	describe('User login', function(){
		beforeEach(function(done) {
			request(app)
				.post('/login')
				.send({
					'username' : 'rahul',
					'password' : 'abcd'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					loggedInUser = res.body.data;
					done();
				});
		});

		it('Should response with a JWT token.', function() {
			assert.isDefined(loggedInUser.token, 'token');
		});
	});

	// thumbnail create attempt with a correct image URL
	describe('Create thumbnail with correct URL', function(){
		let result;
		beforeEach(function(done) {
			this.timeout(5000);
			request(app)
				.post('/thumbnailGeneration/generate')
				.set('Authorization', loggedInUser.token)
				.send({
					'url' : 'https://www.sideshowtoy.com/wp-content/uploads/2018/04/marvel-avengers-infinity-war-thanos-sixth-scale-figure-hot-toys-feature-903429-1.jpg'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body.data;
					done();
				});
		});

		// URL will start with server address
		it('Should response with the URL of the thumbnail.', function() {
			assert.include(result, config.SERVER, 'URL contains server address.');
		});
	});

	// thumbnail create attempt with a wrong image url
	describe('Create thumbnail with incorrect URL', function(){
		let result;
		beforeEach(function(done) {
			this.timeout(5000);
			request(app)
				.post('/thumbnailGeneration/generate')
				.set('Authorization', loggedInUser.token)
				.send({
					url : 'http://www.socialcops.com'
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res;
					done();
				});
		});

		it('Should response with wrong image url : 400.', function() {
			assert.isDefined(result.body.error, 'Error message');
		});
	});

	// thumbnail create attempt with a wrong image url
	describe('Create thumbnail with normal string', function(){
		let result;
		beforeEach(function(done) {
			this.timeout(5000);
			request(app)
				.post('/thumbnailGeneration/generate')
				.set('Authorization', loggedInUser.token)
				.send({
					'url' : 'abcudbcaubcuabdcb'
				})
				.expect(500)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res;
					done();
				});
		});

		it('Should response with wrong image url : 500.', function() {
			assert.isDefined(result.body.error, 'Error message');
		});
	});

	// thumbnail create attempt without a image url
	describe('Create thumbnail with incorrect URL', function(){
		let result;
		beforeEach(function(done) {
			this.timeout(5000);
			request(app)
				.post('/thumbnailGeneration/generate')
				.set('Authorization', loggedInUser.token)
				.send({
					'abcd' : 'http://www.google.com'
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res;
					done();
				});
		});

		it('Should response with missing fields error : 400.', function() {
			assert.isDefined(result.body.error, 'Error message');
		});
	});

});
