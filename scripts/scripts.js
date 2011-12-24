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
		var page = "div#text1";
		var element = $('.holder').has(page);
		page = page.substring(4);
		var holderHeight = $('.holder').height() - 150;
		$('<div id="' + page + '"></div>').appendTo('.holder');
		$.get(path, function(result){
			if(element.length < 1){
				if(result){
					var lines = result.split("\n");
					$('#photo').slideUp('slow');
					$.each(lines, function(key, value){
						if(value.length > 1){
							var index = 0;
							var textHeight = $('#' + page).height();
							if(textHeight < holderHeight){
								index = value.lastIndexOf('*');
								if(index > -1){
									$('<h2>' + value.substring(index + 1) + '</h2>').appendTo('#text');
								}else{
									index = value.indexOf('>');
									if(index > -1){
										$('<i>' + value + '</i>').appendTo('#' + page);
									}else{
										$('<p>' + value + '</p>').appendTo('#' + page);
									}
								}
							}else{
								page = page.substring(0, page.length - 1) + (parseInt(page.charAt(page.length - 1)) + 1);
								$('<div id="' + page + '"></div>').appendTo('.holder');	
								index = value.indexOf('>');
								
								if(index > -1){
									$('<i>' + value + '</i>').appendTo('#' + page);
								}else{
									page = page.substring(0, page.length - 1) + (parseInt(page.charAt(page.length - 1)) - 1);
									$('<p>' + value + '</p>').appendTo('#' + page);
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
