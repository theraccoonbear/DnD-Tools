var Schema = Class.extend({
	chain: [],
	errors: [],
	messages: [],
	parsed: {},
	
	getProp: function(o, f, d) {
		d = typeof d === 'undefined' ? false : d;
		return typeof o[f] !== 'undefined' ? o[f] : d;	
	},
	
	validate: function(o, opts) {
		
	},
	
	chainName: function() {
		var ctxt = this;
		return ctxt.chain.join('.');
	},
	
	error: function(e) {
		var ctxt = this;
		ctxt.errors.push(e);
		console.log('ERROR: ' + e);
	},
	
	message: function(m) {
		var ctxt = this;
		ctxt.messages.push(m);
		console.log(m);
	},
	
	parseObject: function(o) {
		var ctxt = this;
		o.members = ctxt.getProp(o, "members", false);
		var objName = ctxt.getProp(o, "name", false);
		if (o.members !== false) {
			ctxt.message(ctxt.chainName() + " (" + (objName ? objName : '') + "Object)");
			var nmo = {};
			for (var m in o.members) {
				nmo[m] = ctxt.parseField(o.members[m], m);
			}
			o.members = nmo;
		} else {
			ctxt.error("No members specified for \"" + o.name + "\"");
		}
		
		return o;
	},
	
	parseInteger: function(o) {
		var ctxt = this;
		var defaults = {
			name: false,
			min: false,
			max: false
		};
		
		ctxt.message(ctxt.chainName() + " (Integer)");
		
		return $.extend(o, defaults);
	},
	
	parseString: function(o) {
		var ctxt = this;
		var defaults = {
			name: "NO_NAME_STRING",
			min: false,
			max: false,
			pattern: false
		};
		
		ctxt.message(ctxt.chainName() + " (String)");
		
		return $.extend(o, defaults);
	},
	
	parseArray: function(o) {
		var ctxt = this;
		o.elements = ctxt.getProp(o, "elements", false);
		var arName = ctxt.chain.pop() + '[]';  
		if (o.elements !== false) {
			o.elements = ctxt.parseField(o.elements, arName);
		} else {
			ctxt.error("No elements specified for \"" + o.name + "\"");
		}
		ctxt.chain.push('...');
		return o;
	},
	
	parseField: function(field, fName) {
		var ctxt = this;
		
		var retVal = false;
		fName = typeof fName === 'undefined' ? 'MISSING' : fName;
		
		ctxt.chain.push(fName);
		
		if (typeof field === 'undefined') {
			console.log("Undefined passed to parseField()");
		} else {
			field.type = ctxt.getProp(field, 'type', false);
			field.name = ctxt.getProp(field, 'name', false);
			
			if (field.type !== false) {
				switch (field.type.trim().toLowerCase()) {
					case "object": field = ctxt.parseObject(field); break;
					case "integer": field = ctxt.parseInteger(field); break;
					case "string": field = ctxt.parseString(field); break;
					case "array": field = ctxt.parseArray(field); break;
					default: ctxt.error("Unsure of how to handle \"" + field.name + "\" of type \"" + field.type + "\"");
				}
			} else {
				ctxt.error("No type specified for \"" + field.name + "\"");
			}
			retVal = field;
		}
		ctxt.chain.pop();
		return retVal;
	},
	
	parseSchema: function(o) {
		var ctxt = this;
		ctxt.parseField(o, ctxt.getProp(o, "name", "ROOT"));
	},
	
	constructor: function(o) {
		var ctxt = this;
		
		ctxt.parsed = ctxt.parseSchema(o);
	}
});