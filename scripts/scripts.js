$(document).ready(function(){
	var location = document.location;	
	var history = window.history;
	var search = location.search;
	var page = "page";
	var isIE = false;

	if($.browser.msie){
		isIE = true;
	}else{
		isIE = false;
	}
		
	page = getUrlPageValue(page);
	page = (page == null) ? null : (page+'.html');
	displayOnBrowser(page);
	
	$('a').click(clickHandler);
	
	$('ul#socials li a').live('click', function(evt) {
		evt.preventDefault();
		window.open($(this).attr('href'), '_blank');
	});
	
	$('#socials').live('click', clickHandler);
	
	$('#puller').click(function(){
		pullPicture();
		setUrlToDomainName(location);
	});
	
	function clickHandler(evt){
		evt.preventDefault();
		var link = $(this).attr('href');
		displayOnBrowser(link);
	}
	
	function pullPicture(){
		removeParam();
		$('#details div').remove();
		$('#details').removeClass('details');
		$('#puller').hide();
		$('#photo').slideDown('slow');
	}
	
	function getUrlPageValue(page) {
		return decodeURIComponent(
			(location.search.match(RegExp('[?|&]' + page + '=(.+?)(&|$)'))||[,null])[1] //returns the value of ?page= after match (e.g. ?page=me,me)
			// (.)any single character (+)matched 1 or more times (?)zero or more times (&)ends string  ($)matched the end of the string
		); 
		
		/*return decodeURI(
			(RegExp('[?|&]' + page + '=(.+?)(&|$)').exec(location.search))
		);*/
	}
	
	function getDomainName(location, link){
		var root = location.protocol + '//' + (location.hostname || location.host);
		
		if (location.port || false) {
			root += ':' + location.port;
		}
		
		if(location.pathname){
			var path = location.pathname;
			root += path.substring(0, path.lastIndexOf('/'));
		}
		root += '/';

		return root;
	}
	
	function setUrlToDomainName(location, link){
		addLinkColor('home');
		
		if(isIE){
			if(location.hash){
				//location.href.replace(/#.*$/, '#');
				location.href = getDomainName(location, link);
			}
		}else{
			location = getDomainName(location, link);
			history.replaceState('','home',location);	
		}
	}
	
	function setHomePage(link){	
		if(!$('#photo').is(":visible")){
			pullPicture();
		}
		setUrlToDomainName(location, link);
	}
	
	function addLinkColor(node){
		$('#' + node).addClass('current');
	}
	
	function removeLinkColor(node){
		if(node == ""){
			$('#home').removeClass('current');
		}else{
			$('#' + node).removeClass('current');
		}
	}
	
	function removeParam(){
		var parameter = location.search;
		var delimeter = '=';
		
		if(isIE && location.hash != ""){
			parameter = location.hash;
			delimeter = '#';
		}
		
		removeLinkColor(parameter.substring(parameter.indexOf(delimeter) + 1));
	}
	
	function displayOnBrowser(link){
		removeParam();
		displayInfo(link);
	}
	
	function displayInfo(link){	
		if(link == undefined){
			addLinkColor('socials');
		}else if(link != "null"){
			if(link != "index.html"){
				var title = link.substring(0, link.indexOf('.'));
				link = "pages/" + link;
				addLinkColor(title);
				
				if(fileExists(getDomainName(location, null) + link)){
					var photo = $('#photo').slideUp('slow');
										
					if(isIE){
						location.hash = title;
						//location.search = "";
					}else{
						history.replaceState('',title,'?page=' + title);
					}
					
					$.when(photo).done(function(){
						$.get(link, function(data){
								var divDetails = $('#details div');
								if(divDetails.length > 0){
									$('#details div').remove();
								}
								$('#details').addClass('details');
								$('#details').append(data);
								$('#details').slideDown('slow');
							});
							$('#puller').show();
						});
				}else{
					setHomePage(link);
				}
			}else{
				setHomePage(link);
			}
		}
	}
	
	function fileExists(url){
		var http = new XMLHttpRequest();
		http.open('HEAD', url, false);
		http.send();
		return http.status!=404;
	}
	
});
