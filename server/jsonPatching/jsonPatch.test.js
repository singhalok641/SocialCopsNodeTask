'use strict';
/**
 *	Test cases related to Patch module.
 */

let app = require('../');
let strings = require('../misc/strings.js');
let request = require('supertest');
let assert = require('chai').assert;
let expect = require('chai').expect;

/**
 *	Write all possible test cases for Patch in the below describe block.
 */
describe('Patch APIs:', function() {
	// Store logged in user details to reuse in the next apis.
	let loggedInUser;
	// User login attempt with correct cridentials
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
		//	loggedInUser must contain token
		it('Should response with a JWT token.', function() {
			assert.isDefined(loggedInUser.token, 'token');
		});
	});

	// Patch apply attempt with a correct loggedInUser token
	describe('Patch apply', function(){
		let result;
		beforeEach(function(done) {
			request(app)
				.patch('/jsonpatch/applyPatch')
				.set('Authorization', loggedInUser.token)
				.send({
					'myDoc' : {
						'baz': 'qux',
						'foo': 'bar'
					},
					'thePatch' : [
						{ 'op': 'replace', 'path': '/baz', 'value': 'boo' }
					]
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		// response should contain correct patched object.
		it('Should response with the patched object.', function() {
			expect(result.data.patchedDoc.baz).to.equal('boo');
			expect(result.data.patchedDoc.foo).to.equal('bar');
		});
	});

	// Patch apply attempt with a normal user/wrong token
	describe('Patch apply with wrong token', function(){
		let result;
		beforeEach(function(done) {
			request(app)
				.patch('/jsonpatch/applyPatch')
				.set('Authorization', 'abcd')
				.expect(401)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		// Should through token error
		it('Should response with JWT error as token is wrong.', function() {
			expect(result.error).to.equal(strings.error.JWT_FAILURE);
		});
	});

	// Patch apply attempt without a token
	describe('Patch apply with without token', function(){
		let result;
		beforeEach(function(done) {
			request(app)
				.patch('/jsonpatch/applyPatch')
				.expect(403)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		// Should through token error
		it('Should response with missing token error.', function() {
			expect(result.error).to.equal(strings.error.MISSING_TOKEN);
		});
	});

	// Patch apply attempt with invalid body keys(or without defined keys)
	describe('Patch apply with invalid payload', function(){
		let result;
		beforeEach(function(done) {
			request(app)
				.patch('/jsonpatch/applyPatch')
				.set('Authorization', loggedInUser.token)
				.send({
					'docObjahcbj' : {
						'baz': 'qux',
						'foo': 'bar'
					},
					'patchObjakdbckcb' : [
						{ 'op': 'replace', 'path': '/baz', 'value': 'boo' }
					]
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		// response should contain error message for missing fields.
		it('Should response with missing fields error message: 400.', function() {
			assert.isDefined(result.error, 'error message');
			expect(result.error).to.equal(strings.error.MISSING_FIELDS);
		});
	});

	// Patch apply attempt with a wrong patch object.
	describe('Patch apply with wrong patch object.', function(){
		let result;
		beforeEach(function(done) {
			request(app)
				.patch('/jsonpatch/applyPatch')
				.set('Authorization', loggedInUser.token)
				.send({
					'myDoc' : {
						'baz': 'qux',
						'foo': 'bar'
					},
					'thePatch' : [
						{ 'op': 'replakdn', 'path': '/baz', 'value': 'boo' }
					]
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		// response should something went wrong message.
		it('Should response with something went wrong message.', function() {
			assert.isDefined(result.error, 'error message');
			expect(result.error).to.equal(strings.error.SOMETHING);
		});
	});
});
