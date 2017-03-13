$(document).ready (function (e) {

	// Configuration
	var flicker_api_endpoint = 'https://api.flickr.com/services/';
	var flicker_api_public_key = '9dcf1f2f5c566d293d230fe0a9860ec6';
	
	
	// Make api calls
	$('[name="query-form"]').unbind ().submit (function (e) {
		
		// Prevent default
		e.preventDefault ();
		
		
		// Retrieve query
		var keyword = $('[name="query"]').val (); 
		
		$.getJSON('http://api.flickr.com/services/rest/?&amp;method=flickr.photosets.getPhotos&amp;api_key=' + apiKey + '&amp;photoset_id=72157619415192530&amp;format=json&amp;jsoncallback=?',
		
		$.ajax ({
			dataType: "jsonp",
			url: flicker_api_endpoint + 'flickr.interestingness.getList',
			data: {
				api_key: flicker_api_public_key
			}
		}).success (function (r) {
			console.log (r);
		});
		
		
		
		// Prevent submit
		return false; 
	});

});
