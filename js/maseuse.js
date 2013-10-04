var Maseuse = Class.extend({
	constructor: function() {
		this.initHandlers();
		this.resize();
	},

	initHandlers: function() {
		var ctxt = this;
		this.$window = $(window);
		this.$bigBox = $('.bigBox');
		this.$controls = $('#controls');
		this.$input = $('#input');
		this.$output = $('#output');
		this.$regexp = $('#regexp');
		this.$replace = $('#replace');
		this.$process = $('#process');

		this.$window.resize(function() { ctxt.resize(); });

		this.$process.click(function(e) {
			ctxt.$output.val(ctxt.massage({
				input: ctxt.$input.val(),
				rgx: ctxt.$regexp.val(),
				replace: ctxt.$replace.val()
			}));
			e.preventDefault()
		});
	},

	resize: function() {
		var ctxt = this;
		var height = this.$window.height();
		var ctrlHeight = this.$controls.height();
		var bbh = Math.floor((height - ctrlHeight) / 2) - 20;

		this.$bigBox.css({
			height: bbh + 'px'
		})
	},

	massage: function(opts) {
		var ctxt = this;
		var o = {};
		$.extend(o, opts);
		var rgx = typeof o.rgx !== 'undefined' ? new RegExp(o.rgx, 'g') : false;
		var replace = o.replace;
		var input = typeof o.input !== 'undefined' ? o.input.split("\n") : [''];
		var new_data = [];
		var pre = typeof o.pre === 'function' ? o.pre : function(x) { return x; };
		var post = typeof o.post === 'function' ? o.post : function(x) { return x; };
		for (var i = 0; i < input.length; i++) {
			var l = input[i];
			l = pre(l);
			if (rgx !== false) {
				l = l.replace(rgx, replace);
			}
			l = post(l);
			new_data.push(l);
		}
		return new_data.join("\n");
	}
})