module.exports.createPipe = function() {
	var
		pipe = [],
		self = {};

	function add(processor) {
		if (typeof processor !== 'function') {
			throw new TypeError('You can only add functions to the pipe');
		}
		pipe.push(processor);
		return self;
	}

	function remove(processor) {
		delete pipe[pipe.indexOf(processor)];
	}

	function clear() {
		pipe = [];
	}

	function runPipe(value, passedPipe, callback) {
		if (passedPipe.length === 0) {
			return callback(null, value);
		}
		passedPipe[0](value, function(error, processedValue) {
			if (error) {
				return callback(error, value);
			}
			runPipe(processedValue, passedPipe.slice(1), callback);
		});
	}

	function run(value, callback) {
		runPipe(value, pipe, callback);
	}

	// Define public methods
	self = {
		add: add,
		remove: remove,
		clear: clear,
		run: run
	};

	return self;
};
