$(document).ready (function (e) {
	
	// Configuration
	var api_endpoint = 'http://46.101.81.209/interesting-photo/api/';
	
	
	// DOM Elements
	var img = $('.sample-img-placeholder-img');
	var default_img = $('.sample-img-placeholder-img').attr ('src');
	
	
	// Make api calls
	$('[name="query-form"]').unbind ().submit (function (e) {
		
		// Prevent default
		e.preventDefault ();
		
		
		// Reset state
		img.attr ('src', default_img);
		
		
		// Retrieve query
		var keyword = $('[name="query"]').val ().toLowerCase ();
		var found = false; 
		
		
		// Get interesting photos
		$.ajax ({
			dataType: "jsonp",
                        jsonpCallback: "localJsonpCallback",
			url: api_endpoint + keyword,
			success: function (response) {
				img.attr ('src', response.url);
			}
		});
		
		
		// Prevent submit
		return false; 
	});

});

