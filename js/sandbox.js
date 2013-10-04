var arms = [];
var cln_rgx = new RegExp(/\n+/);
var rgn_rgx = new RegExp(/(\d+)-(\d+)/);

var cnt = 0;

var gcv = function(r, c) {
	var val = $(r).find('td:eq(' + c + ')').html();
	if (typeof val == 'undefined') { val = ''; }
	return val.replace("\n", "");
};

var rangeToRoll = function(l, h) {
	var a = 0;
	var div = (h / l);
	//console.log(l + ' : ' + h + ' : ' + div);
	while (Math.floor(div) !== div) {
		a++;
		h--;
		l--;
		var div = (h / l);
	}

	var ret = '' + l + 'd' + h;
	if (a > 0) { ret += ' + ' + a; }
	return ret;
};

var last_arm = '';
$('table:eq(1) tr').each(function(idx, elem) {
	var $e = $(elem);
	
	var cost = gcv($e, 1);
	var name = gcv($e, 0);
	var weight = gcv($e, 2);

	if (cost && name.indexOf('<') < 0) {
		if (name.indexOf('2 Handed') >= 0) {
			name = '2 Handed ' +  last_arm;
		}

		var dmg = gcv($e, 3).split('/');

		
		var sm_dmg = dmg[0];
		var lg_dmg = dmg[1];

		if (rgn_rgx.test(sm_dmg)) {
			var m = rgn_rgx.exec(sm_dmg);
			var sm_dmg = rangeToRoll(m[1], m[2]);
		}

		if (rgn_rgx.test(lg_dmg)) {
			var m = rgn_rgx.exec(lg_dmg);
			var lg_dmg = rangeToRoll(m[1], m[2]);
		}

		var obj = {
			id: ++cnt,
			name: name,
			cost: cost,
			weight: weight,
			dmg: dmg,
			smallMediumDamage: sm_dmg,
			largeDamage: lg_dmg
		};
		console.log(obj);
		
		arms.push(obj);
	}
	last_arm = name;
});

console.log(JSON.stringify(arms));