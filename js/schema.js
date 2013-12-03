var Schema = Class.extend({
	chain: [],
	
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
	
	parseObject: function(o) {
		var ctxt = this;
		o.members = ctxt.getProp(o, "members", false);
		if (o.members !== false) {
			console.log(ctxt.chainName() + " (Object)");
			var nmo = {};
			for (var m in o.members) {
				nmo[m] = ctxt.parseField(o.members[m], m);
			}
			o.members = nmo;
		} else {
			console.log("No members specified for \"" + o.name + "\"");
		}
		
		return o;
	},
	
	parseInteger: function(o) {
		var ctxt = this;
		var defaults = {
			name: "NO_NAME_INTEGER",
			min: false,
			max: false
		};
		
		console.log(ctxt.chainName() + " (Integer)");
		
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
		
		console.log(ctxt.chainName() + " (String)");
		
		return $.extend(o, defaults);
	},
	
	parseArray: function(o) {
		var ctxt = this;
		o.elements = ctxt.getProp(o, "elements", false);
		var arName = ctxt.chain.pop() + '[]';  
		if (o.elements !== false) {
			//console.log(ctxt.chainName() + " (Array)");
			o.elements = ctxt.parseField(o.elements, arName);
		} else {
			console.log("No elements specified for \"" + o.name + "\"");
		}
		
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
			field.name = ctxt.getProp(field, 'name', 'NO_NAME_' + field.type.toUpperCase());
			
			if (field.type !== false) {
				switch (field.type.trim().toLowerCase()) {
					case "object": field = ctxt.parseObject(field); break;
					case "integer": field = ctxt.parseInteger(field); break;
					case "string": field = ctxt.parseString(field); break;
					case "array": field = ctxt.parseArray(field); break;
					default: console.log("Unsure of how to handle \"" + field.name + "\" of type \"" + field.type + "\"");
				}
			} else {
				console.log("No type specified for \"" + field.name + "\"");
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
		
		ctxt.parseSchema(o);
	}
});