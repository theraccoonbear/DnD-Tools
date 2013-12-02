var ClassClass = Class.extend({
	xp: 0,
	name: 'no-name',
	idx: 0,
	
	classList: function() {
		return ['Fighter', 'Mage', 'Thief', 'Rogue']
	},
	
	constructor: function(name, xp) {
		this.xp = typeof xp === 'undefined' ? 0 : xp;
		this.name = this.classList().contains(name) ? name : this.classList[0];
	},
});

var CharacterClass = Class.extend({
	classes: [],
	player: 'no-player',
	name: 'no-name',
	race: 'no-race',
	class: 'no-class',
	age: 0,
	
	renderTo: function(charSheet) {
		var ctxt = this;
		var $cs = $(charSheet);
		var $labels= $cs.find('label');
		$labels.each(function(idx, lbl) {
			var $lbl = $(lbl);
			var id = $lbl.attr('for');
			if (typeof id !== 'undefined') {
				cfld = id.replace(/^[a-z]+-/, '');
				var $fld = $('#' + id);
				
				
				if ($fld.length > 0) {
					if ($fld.hasClass('list')) {
						$fld.empty();
						var srcBits = $fld.data('source');
						var src = core.drill(ctxt, srcBits);
						var tmpl = $fld.data('template');
						
						for (var i = 0; i < src.length; i++) {
							src[i].idx = i;
							$fld.append(Mustache.render(tmpl, src[i]));
						}
						
						console.log(srcBits);
						console.log(src);
						console.log(tmpl);
					} else if (typeof ctxt[cfld] !== 'undefined') {
						$fld.val(ctxt[cfld]);
					}
				}
			}
		});
	},
	
	addClass: function(name, xp) {
		var ctxt = this;
		
		ctxt.classes.push(new ClassClass(name, xp));
	},
	
	constructor: function(o) {
		$.extend(this, o);
	}
});

$(function() {
	var $cbx = $('.characterBox');
	var character = new CharacterClass();
	character.addClass('Fighter');
	character.addClass('Rogue');
	
	//$('select[data-is]').each(function(idx, elem) {
	//	var $elem = $(elem);
	//	$elem.empty();
	//	var source = (new ClassClass()).classList(); //core.drill(character, $elem.data('source').split('.'));
	//	var toSel = '';
	//	for (var i = 0; i < source.length; i++) {
	//		var $opt = $('<option></option>');
	//		$opt.val(source[i]).html(source[i]);
	//		$elem.append($opt);
	//		if (i == 0) {
	//			toSel = source[i];
	//		}
	//	}
	//	$elem.val(toSel);
	//});
	
	afterLogin = function(d) {
		$cbx.fadeIn(500);
		character.renderTo($cbx);
	};
	
	
	
});