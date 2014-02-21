/*
	Forin Knockout binding by ThriveHive
*/
// "forin: someExpression" is equivalent to "template: { forin: someExpression }"
// "forin: { data: someExpression, afterAdd: myfn }" is equivalent to "template: { forin: someExpression, afterAdd: myfn }"


;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['knockout'], factory);
    } else {
        // Browser globals
        factory(root.ko);
    }
}(this, function (ko) {

	if(!ko){throw('Knockout required for this Knockout binding to work');}

    ko.bindingHandlers['forin'] = {
		makeTemplateValueAccessor: function(valueAccessor) {
			return function() {
				var modelValue = valueAccessor(),
					unwrappedValue = ko.utils.peekObservable(modelValue);    // Unwrap without setting a dependency here

				// If unwrappedValue is the array, pass in the wrapped value on its own
				// The value will be unwrapped and tracked within the template binding
				// (See https://github.com/SteveSanderson/knockout/issues/523)
				if ((!unwrappedValue) || typeof unwrappedValue.length == "number")
					return { 'foreach': modelValue, 'templateEngine': ko.nativeTemplateEngine.instance };

				// If unwrappedValue.data is the array, preserve all relevant options and unwrap again value so we get updates
				
				var array = [];
				var obj = unwrappedValue;
				for(var x in obj){
					if(obj.hasOwnProperty(x)){
						array.push({
						  $key: x,
						  $value: obj[x]
					   });
					}
				};
				ko.utils.unwrapObservable(modelValue);
				return {
					'foreach': array,
					'as': unwrappedValue['as'],
					'includeDestroyed': unwrappedValue['includeDestroyed'],
					'afterAdd': unwrappedValue['afterAdd'],
					'beforeRemove': unwrappedValue['beforeRemove'],
					'afterRender': unwrappedValue['afterRender'],
					'beforeMove': unwrappedValue['beforeMove'],
					'afterMove': unwrappedValue['afterMove'],
					'templateEngine': ko.nativeTemplateEngine.instance
				};
			};
		},
		'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			return ko.bindingHandlers['template']['init'](element, ko.bindingHandlers['forin'].makeTemplateValueAccessor(valueAccessor));
		},
		'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			return ko.bindingHandlers['template']['update'](element, ko.bindingHandlers['forin'].makeTemplateValueAccessor(valueAccessor), allBindingsAccessor, viewModel, bindingContext);
		}
	};

    return ko.bindingHandlers['forin'];
}));
