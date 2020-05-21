$(function(){
	const body = $('html, body'), 
				graph = $('.main__graph'),
				point = $('.graph__point'),
				form = $('.form'),
				btnSet = $('.main-bar__btn'),
				tempContainer = $('.main__bar-settings'),
				graphContainer = $('.main__container-graph');

	let graphWidth = graph.outerWidth(),
			graphHeight = graph.outerHeight(),
			barHeight = tempContainer.outerHeight();
			
	var	temp = 0,
			Hr = 0,
			ar;

	
	console.log(temp);
	console.log(Hr);

	if($(window).width() <= 730) {
		graphContainer.css('margin-top', barHeight);
		form.css('margin-top', barHeight);
	}

	function map(x, in_min, in_max, out_min, out_max){
  	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	point.css(
		{
			top: map(Hr, 0, 100, 638, 5),
			left: map(temp, 12, 28, 120, 626) 
		}
	);
	
	$.get('../charts2/logJson.php', function(data){
		ar = JSON.parse(data);
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

		$('.js-hr').text(' ' + temp + ' Сº');
		$('.js-temp').text(' ' + Hr + ' %');
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

	graphContainer.animate({'scrollLeft': 260}, 350);

	btnSet.on('click', function(){
		if($(this).attr('aria-expanded') == 'false'){
			body.animate({'scrollTop': 0}, 350);
			$('.main__form-container').slideDown('700', function(){
				btnSet.attr('aria-expanded', 'true');
				body.addClass('off-scroll');
				graphContainer.addClass('off-scroll');
			});
		} else {
			$('.main__form-container').slideUp('700', function(){
				btnSet.attr('aria-expanded', 'false');
				body.removeClass('off-scroll');
				graphContainer.removeClass('off-scroll');
				graphContainer.animate({'scrollLeft': 260}, 350);
			});
		}
	});

	body.on('click',function(target){
		//$('.modal').remove();
		popup('close');
		//console.log(target);
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