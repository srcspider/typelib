var assign = require('./lib/assign');
var slice = Array.prototype.slice;
// ----------------------------------------------------------------------------

//
// props merges all paramters that are not null
//

var props = function () {
	var args = slice.call(arguments, 0);
	var argc = args.length;

	var mergeable = [];

	var i;
	for (i = 0; i < argc; i++) {
		if (args[i] != null) {
			mergeable.push(args[i]);
		}
	}

	mergeable.unshift({});
	return assign.apply(null, mergeable);
};

module.exports = props;
