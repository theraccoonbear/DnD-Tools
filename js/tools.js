var ToolsClass = Class.extend({
	DBs: {},
	templates: {
		Arms: {
			head: '<tr><th>Name</th><th>Cost</th><th>Weight</th><th>Dmg (S/M)</th><th>Dmg (L)</th></tr>',
			record: '<tr><td><a href="#" data-id="{{id}}">{{name}}</a></td><td>{{cost}}</td><td>{{weight}}</td><td>{{smallMediumDamage}}</td><td>{{largeDamage}}</td></tr>'
		}
	},
	
	UI: {},
	
	constructor: function() {
		var ctxt = this;
		
		var toLoad = [
			{name: 'Arms', src: 'js/data/arms.js'}
		];
		
		ctxt.loadData({
			table: 'Arms',
			src: 'js/data/arms.js'
		});
		
		ctxt.registerHandlers();
		
	},
	
	registerHandlers: function() {
		var ctxt = this;
		$('#searchField').keyup(function() {
			var $this = $(this);
			var val = $this.val();
			ctxt.searchToHTML('Arms', {name: {likenocase: val}});
		});
		
		$('body').on('click', 'a.item', function(e) {
			var $this = $(this);
			var id = $this.data('id');
			var table = $this.closes('table').data('table');
			console.log(ctxt.getById(table, id));
			
		});
	},
	
	loadData: function(opts) {
		var ctxt = this;
		
		var o = {
			'table': 'tableName',
			'src': '/tableName.csv'
		};
		
		$.extend(o, opts);
		
		$.getJSON(o.src, {}, function(data) {
			ctxt.DBs[o.table] = new TAFFY(data);
			
			var arrows = ctxt.DBs[o.table]({name:{'likenocase':'arrow'}});
			
			if (typeof o.after === 'function') {
				o.after(data);
			}
		});
	},
	
	getByID: function(table, id) {
		var result = ctxt.DBs[table]({id: id});
		return result;
	},
	
	searchToHTML: function(table, search) {
		var ctxt = this;
		var tmpls = ctxt.templates[table];
		
		var results = ctxt.DBs[table](search);
		var $mkup = $('<table id="table_' + table + '" data-table="' + table + '"></table>');
		$mkup.append(Mustache.render(tmpls.head, {}));
		results.each(function(r) {
			$mkup.append(Mustache.render(tmpls.record, r));
		});
		
		$('#resultBox').html($mkup);
	},
	
	_xyz: null
});

var tools = new ToolsClass();