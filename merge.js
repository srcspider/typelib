var assign = require('./lib/assign');
var slice = Array.prototype.slice;
// ----------------------------------------------------------------------------

//
// merges all paramters and returns a new merged object
// useful for extending mixins
//

var merge = function () {
	var args = slice.call(arguments, 0);
	args.unshift({});
	return assign.apply(null, args);
};

module.exports = merge;
