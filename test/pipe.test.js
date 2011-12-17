var
	Pipe = require('../../piton-pipe'),
	assert = require('assert');

function additionProcess(value, callback) {
	callback(null, value + 1);
}

describe('pipe', function() {

	describe('#add()', function() {

		it('without a function as a parameter fails', function() {
			var pipe = Pipe.createPipe();
			assert.throws(function() {
				pipe.add();
			}, /TypeError/);
		});

		it('is chainable', function() {
			var pipe = Pipe.createPipe();
			pipe.add(additionProcess).should.equal(pipe);
		});
	});

	describe('#run()', function() {

		it('does nothing with an empty pipe', function(done) {
			var pipe = Pipe.createPipe();
			pipe.run(1, function(error, value) {
				value.should.equal(1);
				done();
			});
		});

		it('run processes correctly', function(done) {

			var pipe = Pipe.createPipe()
			.add(additionProcess)
			.add(additionProcess);

			pipe.run(1, function(error, value) {
				value.should.equal(3);
				done();
			});

		});

	});

	describe('#remove()', function() {

		it('is successful', function(done) {

			var functionToRemove = function(value, callback) {
				callback(null, value + 10);
			};

			var pipe = Pipe.createPipe()
			.add(additionProcess)
			.add(functionToRemove);

			pipe.remove(functionToRemove);

			pipe.run(1, function(error, value) {
				value.should.equal(2);
				done();
			});

		});

		it('throws error if process function not found', function() {

			var pipe = Pipe.createPipe();
			assert.throws(function() {
				pipe.remove(additionProcess);
			}, /RangeError: processor function not found in pipe/ );

		});

		it('is chainable', function() {
			var pipe = Pipe.createPipe();

			pipe
				.add(additionProcess)
				.remove(additionProcess).should.equal(pipe);
		});
	});

	describe('#clear()', function() {

		it('does not error with empty pipe', function() {

			var pipe = Pipe.createPipe();

			pipe.clear();
		});

		it('is chainable', function() {

			var pipe = Pipe.createPipe();

			pipe
				.clear();

		});

	});

});