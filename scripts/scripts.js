$(document).ready(function(){
	//global variables
	var location = document.location;	
	var history = window.history;
	var page = "page";
	var isIE = false;

	isIE = ($.browser.msie) ? true : false; //checks browser type
		
	page = getUrlPageValue(page);
	page = (page == null) ? null : (page+'.html');
	displayOnBrowser(page);
	
	$('a').click(clickHandler);
	
	$('ul#socials li a').live('click', function(evt) { //binds dynamically created elements to have functions
		evt.preventDefault();
		window.open($(this).attr('href'), '_blank');
	});
		
	$('#company p b a').live('click', function(evt) { //binds dynamically created elements to have functions
		evt.preventDefault();
		window.open($(this).attr('href'), '_blank');
	});
	
	$('#socials').live('click', clickHandler);
	
	$('#company').live('click', clickHandler);
	
	//if clicked, shows the default image and sets the URL to domain name and port number (if any)
	$('#puller').click(function(){
		pullPicture();
		setUrlToDomainName(location);
	});
	
	//prevents the default behavior of a link
	function clickHandler(evt){
		evt.preventDefault();
		var link = $(this).attr('href');
		displayOnBrowser(link); //displays either for IE or none-IE
	}
	
	//removes data on the box and shows the face picture
	function pullPicture(){
		removeParam();
		$('#details div').remove();
		$('#details').removeClass('details');
		$('#puller').hide();
		$('#photo').slideDown('slow');
	}
	
	//gets the value of 'page' on the browser
	function getUrlPageValue(page) {
		return decodeURIComponent(
			(location.search.match(RegExp('[?|&]' + page + '=(.+?)(&|$)'))||[,null])[1] //returns the value of ?page= after match (e.g. ?page=me,me)
			// (.)any single character (+)matched 1 or more times (?)zero or more times (&)ends string  ($)matched the end of the string
		); 
		
		/*return decodeURI(
			(RegExp('[?|&]' + page + '=(.+?)(&|$)').exec(location.search))
		);*/
	}
	
	//returns domain name and port number (if any)
	function getDomainName(location){
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
	
	//removes any traling parameter on the URL and displays the domain name and port number (if any)
	function setUrlToDomainName(location){
		addLinkColor('home');
		
		if(isIE){
			if(location.hash){
				location.href = getDomainName(location);
			}
		}else{
			location = getDomainName(location);
			history.replaceState('','home',location);	
		}
	}
	
	//displays the default page when URL parameters are not available
	function setHomePage(link){	
		if(!$('#photo').is(":visible")){
			pullPicture();
		}
		setUrlToDomainName(location);
	}
	
	//adds color to the node selected
	function addLinkColor(node){
		$('#' + node).addClass('current');
	}
	
	//removes the color of the previous node selected
	function removeLinkColor(node){
		if(node == ""){
			$('#home').removeClass('current');
		}else{
			$('#' + node).removeClass('current');
		}
	}
	
	//determines what node is to be removed of color
	function removeParam(){
		var parameter = location.search;
		var delimeter = '=';
		
		if(isIE && location.hash != ""){
			parameter = location.hash;
			delimeter = '#';
		}
		
		removeLinkColor(parameter.substring(parameter.indexOf(delimeter) + 1));
	}
	
	//displays an inner scroll when the selected node is the jobhistory
	function displayOnBrowser(link){
		removeParam();	
		(link.indexOf("jobhistory.html") == -1) ? removeScroller(link) : addScroller(link);
		displayInfo(link);	
	}
	
	//displays data on the right box
	function displayInfo(link){	
		if(link == undefined){
			addLinkColor('socials');
		}else if(link != "null"){
			if(link != "index.html"){
				var title = link.substring(0, link.indexOf('.')); //gets the requested page
				link = "pages/" + link; //creates link to the physical file
				addLinkColor(title);
				
				if(fileExists(getDomainName(location) + link)){ // checks if the page exists 
					var photo = $('#photo').slideUp('slow'); //hides default photo from the right box
										
					if(isIE){
						location.hash = title; //use hash to avoid reload of page; changing value of location.search reloads page
					}else{
						history.replaceState('',title,'?page=' + title); //IE does not implement replaceState
					}
					
					$.when(photo).done(function(){ //checks if photo is hidden
						$.get(link, function(data){
								var divDetails = $('#details div');
								if(divDetails.length > 0){
									$('#details div').remove();
								}
								$('#details').addClass('details');
								$('#details').append(data); //shows data on the right box
								$('#details').slideDown('slow');
							}, "html");
							$('#puller').show(); //shows arrow
						});
				}else{
					setHomePage(link); //shows default display
				}
			}else{
				setHomePage(link);
			}
		}
	}
	
	//removes the class from the element to have no scroll effect
	function removeScroller(link){
		$('#details').removeClass('scrolled');
	}
	
	//adds the class from the element for a scroll effect
	function addScroller(link){
		$('#details').addClass('scrolled');
	}
	
	//if status is not 404, then the file exists
	function fileExists(url){
		var http = new XMLHttpRequest();
		http.open('HEAD', url, false);
		http.send();
		return http.status!=404;
	}
	
});
