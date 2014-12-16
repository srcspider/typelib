**typelib** is a easy lowlevel, no-magic, no fuss, type definition library

The library helps you define struct-like structures, class-like structures,
trait like structures and inheritable structures with simple merge functions,
and javascript's native mechanisms. Unlike other libraries typelib encourages
you to do it the javascript way! rather then trying to emulate structures
from other languages.

```js
npm install typelib
```
Using a `package.json` to manage dependencies?

 - `npm i -S typelib` to install
 - `npm rm -S typelib` to uninstall

**USAGE**

`type.chain` is a merge function that will create a new object with the
prototype pointer set to the first paramter. Additional parameters passed to
the function will be merged into the object. The function always returns a
new object and accepts one or as many as you like paramters. Parameters are
merged in order.

```js
var type = require('typelib');
// ----------------------------------------------------------------------------

var MyOtherType = require('./MyOtherType');

var MyType = function (param1, param2, param3) {
	MyOtherType.call(this, param1, param2, param3);
};

MyType.prototype = type.chain(MyOtherType.prototype, SomeMixin, {

	// my stuff

});

module.exports = MyType;
```

`type.merge` is similar to `type.chain` but it only merges all the paramters
into a single new object and doesn't do any prototype pointer manipulation;
it's useful for extending mixins. Paramters are merged in order.

```js
var type = require('typelib');
// ----------------------------------------------------------------------------

var Mixin1 = require('./Mixin1');
var Mixin2 = require('./Mixin2');

var MyMixin = type.merge(Mixin1, Mixin2, {

	// my stuff

});

module.exports = MyMixin;
```

`type.props` is a merge function that will ignore parameters that are `null`
or `undefined`. Returns a new object that's the combination of the parameters
merged in order.

```js
var type = require('typelib');
// ----------------------------------------------------------------------------

var defaults = {
	// my props
};

var MyType = function (conf) {
	// no need to test conf, it's tested by type.props
	this._conf = type.props(defaults, conf);
};

module.exports = MyType;
```

## On declaring types

There are a lot of libraries out there that offer a "inheritance mechanism."
You don't need them! This very module is to some extent also one of those
libraries and yes **you don't necesarily need this module either**!

I feel compelled to show you how you can do with out it entirely.

### Do you just need a simple class-like structure?

Here you go,

```js
var ExampleClass = function (name) {
	// this is your constructor
    this._name = name;
};

ExampleClass.prototype = {

	_greeting: 'hello',

    hello: function () {
    	console.log(this._greeting + ', ' + this.name);
    },

    name: function () {
    	return this._name;
    }

};
```

Now we can do this:

```js
var example = new ExampleClass('world');
example.hello(); // => "hello, world"
```

If you need a equivalent of `struct` in javascript the above is almost
always all you need.

#### How does that even work?

Let me break down the `new ExampleClass('world')` there into fundamental operations.

Here is what javascript does for you when you call a function using `new`:

```js
// create a [new] object and set it's internal prototype mechanism pointer
// to point to the object defined in the property "prototype" of the
// function "ExampleClass"
var new_object = Object.create(ExampleClass.prototype);
// invoke the function setting [this] to [new object]
ExampleClass.call(new_object, 'world');
```

In the above, if you're not familiar with them,

 - `Object.create(object_to_use_as_prototype)` creates a new empty object
   which has its internal prototype pointer set to the object passed as the
   first parameter
 - `.call` invokes a function with the first parameter passed to the function
   as the variable `this` and all the other parameters passed in as regular
   function parameter

### But I need to extend stuff!

Easy!

First, get a `merge` function that can combine the properties of two arbitrary
number of objects, JQuery's `$.extends`, underscores or lodash's `_.merge`,
node's `require('util')._extend`, whatever you can find will do! If you
include `Object.assign` polyfill you can just use that instead. We'll assume
you have it as an `assign` function in the example.

Now you just do,

```js
var OtherType = require('./OtherType');
var SomeMixin = require('./SomeMixin');

var Example = function (param1, param2) {
	OtherType.call(this, param1, param2);
};

Example.prototype = assign(Object.create(OtherType.prototype), SomeMixin, {

	// your stuff

});

module.exports = Example;
```

### So why use typelib?

`typelib` is really small, much smaller then libraries like underscore,
lodash, jQuery, and so on.

The merge functions it provides are also specialized towards declaring types.
The code from using them is also easier to understand for anyone that doesn't
know the finer details of javascript, and easy for them to use to get going.

But hey if you can manage with out it, more power to you!
