$(function(){
	const graph = $('.main__graph'),
				point = $('.graph__point');

	let graphWidth = graph.outerWidth(),
			graphHeight = graph.outerHeight();
			
	var	temp = 0,
			Hr = 0,
			ar;

	
	console.log(temp);
	console.log(Hr);

	function map(x, in_min, in_max, out_min, out_max){
  	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	point.css(
		{
			top: map(Hr, 0, 100, 638, 5),
			left: map(temp, 12, 28, 120, 626) 
		}
	);
	
	$.get('http://192.168.0.15/charts/log-out.php', function(data){
		
		let arr = $(data).text().replace(/\n/g, '').replace(/dat/g, "\"dat\"")
																							  .replace(/temp/g, "\"temp\"")
																							  .replace(/ppm/g, "\"ppm\"")
																							  .replace(/BMEt/g, "\"BMEt\"")
																							  .replace(/BMEp/g, "\"BMEp\"")
																							  .replace(/BMEh/g, "\"BMEh\"");
		
 		let Str = arr.substring(0, arr.length - 2) + ']';

		ar = JSON.parse(Str);
		temp = ar[ar.length - 1].BMEt;
		Hr = ar[ar.length - 1].BMEh;

		console.log(temp);
	  console.log(ar);
	  console.log(ar.length);

	  point.css(
			{
				top: map(Hr, 0, 100, 638, 5),
				left: map(temp, 12, 28, 120, 626) 
			}
		);
	});
});