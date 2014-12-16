var assign = require('./lib/assign');
var slice = Array.prototype.slice;
// ----------------------------------------------------------------------------

var chain = function () {
	var args = slice.call(arguments, 0);
	var Parent = Object.create(args.shift());
	args.unshift(Parent);
	return assign.apply(Object, args);
};

module.exports = chain;
