A Knockout binding for looping over object properties like the foreach binding
======

Say you have an object and would like to render a template for each property, like you do with the "foreach" binding. The "forin" binding allows you to do just that (obviously in no guaranteed order).

With an object like

	var obj = ko.observable({
		prop1: 'Foo',
		prop2: 'Bar',
		prop3: 'Baz'
	});

You can use the forin binding to render a template, like so, using the "$key" and "$value" properties to reference the property names and their values in the template:

	<ul data-bind="forin: obj">
		<li data-bind="text: $key + ': ' + $value"></li>
	</ul>

Of course, that would render an html list that would look like:

- Prop1: Foo
- Prop2: Bar
- Prop3: Baz

That's about it, no options or anything else.
