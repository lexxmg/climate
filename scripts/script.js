$(function(){
	const body = $('html, body'), 
				graph = $('.main__graph'),
				point = $('.graph__point'),
				form = $('.form');

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
	
	$.get('http://192.168.0.15/charts2/log-out.php', function(data){
		
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

		$('.graph__temp').text('Темпиратура: ' + temp + ' Сº');
		$('.graph__hr').text('Влажность: ' + Hr + ' %');
	});

	$.get(form.attr('action'), function(data){
		const val = JSON.parse(data);

		//console.log(val);
		if(val.check == 'on'){
			$('.form__input--checkbox').prop('checked', true);
		} else {
			$('.form__input--checkbox').prop('checked', false);
		}
		$('.select').val(val.out);
		$('.form__input--text').val(val.hr);
	});

	form.on('submit', function(evetn){
		event.preventDefault();
		console.log($(this).serialize());
		$.get($(this).attr('action'), 
					$(this).serialize() 
			).done(function(){
				popup('Данные отправлены');
				setTimeout(popup, 3000, 'close');
			})
			.fail(function(){
				popup('Ошибка сервера');
				$('.modal__popup').addClass('modal__popup--err');
				setTimeout(popup, 10000, 'close');
			});
	});

	body.on('click',function(){
		//$('.modal').remove();
		popup('close');
	});
	
	function popup(text){
		body.prepend(
			`<dev class="modal">
			 	<div class="modal__popup">
					<span class="modal__text">${text}</span>
				</div>
			 </dev>`
		);

		if(text == 'close'){
			$('.modal').remove();
		}
	}

});