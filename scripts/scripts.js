$(document).ready(function(){
	$('.menu > li').bind('mouseover', openSubMenu);
	$('.menu > li').bind('mouseout', closeSubMenu);
	
	function openSubMenu(){
		$(this).find('ul').css('visibility','visible');
	};
	
	function closeSubMenu(){
		$(this).find('ul').css('visibility','hidden');
	};
	
	$('a#profile').click(function(){
		var path = 'txts/profile.txt';
		var element = $('.holder').has('div#text');
		$('<div id="text"></div>').appendTo('.holder');
		$.get(path, function(result){
			if(element.length < 1){
				if(result){
					var lines = result.split("\n");
					$('#photo').slideUp('slow');
					$.each(lines, function(key, value){
						if(value.length > 1){
							var index = value.lastIndexOf('*');
							if(index > -1){
								$('<h2>' + value.substring(index + 1) + '</h2>').appendTo('#text');
							}else{
								index = value.indexOf('+');
								if(index > -1){
									$('<i>' + value + '</i>').appendTo('#text');
								}else{
									$('<p>' + value + '</p>').appendTo('#text');
								}
							}
						}
					});
					//$('.holder').css({'overflow-y': 'scroll'});
				}
			}
		});
	});
	
	$('#banner').click(function(){
		$('#photo').slideDown('slow');
		$('#text').remove();
	});
});
