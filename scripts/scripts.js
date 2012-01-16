$(document).ready(function(){
	var location = document.location;	
	var history = window.history;	
	var page = "page";
	
	page = getUrlPageValue(page);
	page = (page == null) ? null : (page+'.html');
	displayInfo(page);
	
	$('a').click(clickHandler);
	
	$('#socials').live('click', clickHandler);
	
	$('#puller').click(function(){
		setUrlToDomainName(location);
		pullPicture();
	});
	
	function clickHandler(evt){
		evt.preventDefault();
		var link = $(this).attr('href');
		displayInfo(link);
	}
	
	function pullPicture(){
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
		location = getDomainName(location, link);
		history.replaceState('','home',location);	
	}
	
	function addLinkColor(node){
		$('#' + node).addClass('current');
	}
	
	function removeLinkColor(node){
		$('#' + node).removeClass('current');
		
	}
	
	function displayInfo(link){
		var search = location.search;
		removeLinkColor(search.substring(search.indexOf('=') + 1));
		
		if(link != "null"){
			if(link != "index.html"){
				var title = link.substring(0, link.indexOf('.'));
				link = "pages/" + link;
				addLinkColor(title);
				
				if(fileExists(getDomainName(location, null) + link)){
					var photo = $('#photo').slideUp('slow');
					
					history.replaceState('',title,'?page=' + title);
					
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
				}
			}else{
				setUrlToDomainName(location, link);
				addLinkColor('home');
				if(!$('#photo').is(":visible")){
					pullPicture();
				}
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
