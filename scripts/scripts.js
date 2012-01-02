$(document).ready(function(){
	
	$('a').click(function(evt){
		evt.preventDefault();
		var link = $(this).attr('href');
		
		if(link != "index.html"){
		var leftMenu = $('#left').slideUp('slow');
		var rightMenu = $('#right').slideUp('slow');
		
		$.when(leftMenu, rightMenu).done(function(){
			$.get(link, function(data){
					$('#details').append(data);
				});
				$('#puller').show();
			});
		}
	});
	
	$('#puller').click(function(){
		$('#details div').remove();
		$('#puller').hide();
		$('#left').slideDown('slow');
		$('#right').slideDown('slow');
	});
	
	/*var currentPage = 1;
 
	$('#arrow').hide();
	
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
		$.get(path, function(result){
			if(element.length < 1){
				$('<div id="' + page + '"></div>').appendTo('.holder');
				if(result){
					var lines = result.split("\n");
					var toggleClassFcn = function(){$("#arrow").toggleClass("no-image");}
					setInterval(toggleClassFcn, 1000);
					$('#banner').css('margin-left','-250px');
					$('#arrow').show();
					$('#photo').slideUp('slow');
					$.each(lines, function(key, value){
						if(value.length > 1){
							var index = 0;
							var textHeight = $('#' + page).height();
							if(textHeight < holderHeight){
								index = value.lastIndexOf('*');
								if(index > -1){
									$('<h2>' + value.substring(index + 1) + '</h2>').appendTo('#' + page);
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
								//$('<div id="' + page + '"></div>').appendTo('.holder');
								$('<div id="' + page + '"></div>').appendTo('.holder').hide();
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
			}else{
				var toggleClassFcn = function(){$("#arrow").toggleClass("no-image");}
				setInterval(toggleClassFcn, 1000);				
				$('#banner').css('margin-left','-250px');
				$('#arrow').show();
				$('#photo').slideUp('slow');
				$('#text' + currentPage).show();
			}
		});
	});
	
	$('#banner').click(function(){
		$(this).css('margin-left','10px');
		$('#photo').slideDown('slow');
		$('#arrow').hide();
		$('#text' + currentPage).hide();
	});
	*/
});
