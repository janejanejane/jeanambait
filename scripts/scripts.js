$(document).ready(function(){
	
	$('a').click(function(evt){
		evt.preventDefault();
		var link = $(this).attr('href');
		
		if(link != "index.html"){
		var photo = $('#photo').slideUp('slow');
		
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
			if(!$('#photo').is(":visible")){
				pullPicture();
			}
		}
	});
	
	
	$('#puller').click(function(){
		pullPicture();
	});
	
	function pullPicture(){
			$('#details div').remove();
			$('#details').removeClass('details');
			$('#puller').hide();
			$('#photo').slideDown('slow');
	}
});
