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
		
		
		$.ajax ({
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