'use strict';
/**
 *	Test cases related to Patch module.
 */

let app = require('../');
let request = require('supertest');
let assert = require('chai').assert;
let expect = require('chai').expect;

/**
 *	Write all possible test cases for Patch in the below describe block.
 */
describe('User login:', function() {

	// User login attempt with correct cridentials
	describe('User login with correct inputs:', function(){
		let loggedInUser;
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
		//	loggedInUser must contain token
		it('Should response with a JWT token.', function() {
			assert.isDefined(loggedInUser.token, 'token');
		});
	});

	// User login attempt without required fields.
	describe('User login without correct fields', function(){
		let loggedInUser;
		beforeEach(function(done) {
			request(app)
				.post('/login')
				.send({
					'username' : 'rahul',
					'passwordadda' : 'abcd'
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					loggedInUser = res.body;
					done();
				});
		});
		//	loggedInUser must contain token
		it('Should response with error message.', function() {
			assert.isDefined(loggedInUser.error, 'error message');
		});
	});

});
