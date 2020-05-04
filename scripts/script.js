$(function(){
	const graph = $('.main__graph'),
				point = $('.graph__point');

	let graphWidth = graph.outerWidth(),
			graphHeight = graph.outerHeight();

	console.log(graphWidth);
	console.log(graphHeight);

	function map(x, in_min, in_max, out_min, out_max){
  	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	point.css(
		{
			top: map(40, 0, 100, 638, 5),
			left: map(22.6, 12, 28, 120, 626) 
		}
	);
	
	$.get();
});