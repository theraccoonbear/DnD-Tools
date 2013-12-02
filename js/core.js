Array.prototype.contains = function(obj, firm) {
	firm = firm === true ? true : false;
	
	var i = this.length;
	while (i--) {
		if ((!firm && this[i] == obj) || this[i] === obj) {
			return true;
		}
		
	}
	return false;
}

var sirest;
var core;

var CoreClass = Class.extend({
	drill: function(a, b) {
		var bits = typeof b === 'undefined' ? a : b;
		var node = typeof b === 'undefined' ? window : a;
		
		if (typeof bits === 'string') {
			bits = bits.split('.');
		}
		
		for (var i = 0; i < bits.length; i++) {
			if (typeof node[bits[i]] == 'undefined') {
				return false;
			} else {
				node = node[bits[i]];
			}
		}
		return node == window ? false : node;
	},
	
	constructor: function() { },
	_xyz: null
});



$(function() {
	sirest = new Sirest({
		app: 'dnd.tools'
	});
	
	core = new CoreClass();
	
});