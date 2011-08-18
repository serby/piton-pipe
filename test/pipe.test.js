var
	Pipe = require('../../piton-pipe'),
	assert = require('assert');

function additionProcess(value, callback) {
	callback(null, value + 1);
}

module.exports = {
	'add without a function fails': function() {
		var pipe = Pipe.createPipe();
		assert.throws(function() {
			pipe.add();
		}, /TypeError/);
	},
	'add is chainable': function() {
		var pipe = Pipe.createPipe();
		assert.strictEqual(pipe.add(additionProcess), pipe);
	},
	'run does nothing with an empty pipe': function() {
		var pipe = Pipe.createPipe();
		pipe.run(1, function(error, value) {
			assert.eql(value, 1);
		});
	},
	'run processes correctly': function() {

		var pipe = Pipe.createPipe()
		.add(additionProcess)
		.add(additionProcess);

		pipe.run(1, function(error, value) {
			assert.eql(value, 3);
		});
	},
	'remove is successful': function() {

		var pipe = Pipe.createPipe()
		.add(additionProcess)
		.add(additionProcess);

		pipe.run(1, function(error, value) {
			assert.eql(value, 3);
		});
	}
};
