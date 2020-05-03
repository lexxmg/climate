$(function(){
	const graph = $('.main__graph'),
				point = $('.graph__point');

	let graphWidth = graph.outerWidth(),
			graphHeight = graph.outerHeight();

	console.log(graphWidth);
	console.log(graphHeight);

	point.css(
		{
			top: 300,
			left: graphWidth / 2 - 25 
		}
	);
	console.log(point.position());
});