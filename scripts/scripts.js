$(document).ready(function(){
	var location = document.location;	
	
	$('a').click(function(evt){
		evt.preventDefault();
		var link = $(this).attr('href');
		
		var history = window.history;
		
		if(link != "index.html"){
			var title = link.substring(0, link.indexOf('.'));
			var photo = $('#photo').slideUp('slow');
			
			history.replaceState('',title,title);
			link = "pages/" + link;
			$.when(photo).done(function(){
				$.get(link, function(data){
						var divDetails = $('#details div');
						if(divDetails.length > 0){
							$('#details div').remove();
						}
						$('#details').addClass('details');
						$('#details').append(data);
					});
					$('#puller').show();
				});
		}else{
			setUrlToDomainName(location, link);
			if(!$('#photo').is(":visible")){
				pullPicture();
			}
		}
	});
	
	
	$('#puller').click(function(){
		setUrlToDomainName(location);
		pullPicture();
	});
	
	function pullPicture(){
			$('#details div').remove();
			$('#details').removeClass('details');
			$('#puller').hide();
			$('#photo').slideDown('slow');
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
});
