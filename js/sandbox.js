var arms = [];
var cln_rgx = new RegExp(/\n+/);

var cnt = 0;

var gcv = function(r, c) {
	var val = $(r).find('td:eq(' + c + ')').html();
	if (typeof val == 'undefined') { val = ''; }
	return val.replace("\n", "");
};

$('#arms tr').each(function(idx, elem) {
	var $e = $(elem);
	
	var dmg = gcv($e, 3).split('/');
	
	var obj = {
		id: ++cnt,
		name: gcv($e, 0),
		cost: gcv($e, 1),
		weight: gcv($e, 2),
		smallMediumDamage: dmg[0],
		largeDamage: dmg[1]
	};
	
	arms.push(obj);
	
});

//$('#output').html(JSON.stringify(arms));

console.log(JSON.stringify(arms));