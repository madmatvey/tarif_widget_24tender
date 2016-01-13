
var moneyFormat = wNumb({
	decimals: 3,
	thousand: '.',
	postfix: '<i class="fa fa-rub"></i> '
});

var moneyValueFormat = wNumb({
	decimals: 3,
	thousand: '.',
	encoder: function( value ){
			return Math.round(value);
		}
});

var smallProcure = 1000000;
var middleProcure = 30000000;

var garanteedEconomyFormat = wNumb({
	decimals: 3,
	thousand: '.',
	encoder: function( value ){
			var econ = value*procureTypeEconomy(value)/100
			return Math.round(econ);
		}
});

var tarifFormat = wNumb({
	decimals: 3,
	thousand: '.',
	encoder: function( value ){
			var econ = value*procureTypeEconomy(value)/100
			var tariff = econ*procureTypeTariff(value)/100
			return Math.round(tariff);
		}
});

var range_all_sliders = {
	'min': [ 100000 ],
    '50%': [ 1000000, 100000 ],
    '75%': [ 30000000, 1000000 ],
    'max': [ 100000000 ]
};



var rangeSlider = document.getElementById('priceCalc');

noUiSlider.create(rangeSlider, {
	start: [ 500000 ],
	range: range_all_sliders,
	step: 1000,
	format: moneyValueFormat,
	pips: {
		mode: 'range',
		density: 5,
		format: moneyFormat
	}
});

var inputFormat = document.getElementById('input-format');
rangeSlider.noUiSlider.on('update', function( values, handle ) {
	inputFormat.value = values[handle];
});
inputFormat.addEventListener('change', function(){
	rangeSlider.noUiSlider.set(this.value);
});

var garanteedEconomy = document.getElementById('garanteedEconomy');
rangeSlider.noUiSlider.on('update', function( values, handle ) {
  garanteedEconomy.innerHTML = garanteedEconomyFormat.to(moneyValueFormat.from(rangeSlider.noUiSlider.get()));
});

var ourTariff = document.getElementById('ourTariff');
rangeSlider.noUiSlider.on('update', function( values, handle ) {
  ourTariff.innerHTML = tarifFormat.to(moneyValueFormat.from(rangeSlider.noUiSlider.get()));
});

var procentEconomy = document.getElementById('procentEconomy');
rangeSlider.noUiSlider.on('update', function( values, handle ) {
  procentEconomy.innerHTML = procureTypeEconomy(moneyValueFormat.from(rangeSlider.noUiSlider.get()));
});

var tarifProcent = document.getElementById('tarifProcent');
rangeSlider.noUiSlider.on('update', function( values, handle ) {
  tarifProcent.innerHTML = procureTypeTariff(moneyValueFormat.from(rangeSlider.noUiSlider.get()));
});

function procureTypeTariff ( value )
{
	if(value <= smallProcure) return 35;
	if(value > smallProcure && value <= middleProcure) return 25;
	if(value > middleProcure) return 12; 
}

function procureTypeEconomy ( value )
{
	if(value <= smallProcure) return 20;
	if(value > smallProcure && value <= middleProcure) return 15;
	if(value > middleProcure) return 10; 
} 