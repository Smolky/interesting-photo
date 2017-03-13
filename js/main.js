$(document).ready (function (e) {

	// Configuration
	var flicker_api_endpoint = 'https://api.flickr.com/services/rest/';
	var flicker_api_public_key = '9dcf1f2f5c566d293d230fe0a9860ec6';
	
	
	// Make api calls
	$('[name="query-form"]').unbind ().submit (function (e) {
		
		// Prevent default
		e.preventDefault ();
		
		
		// Retrieve query
		var keyword = $('[name="query"]').val ().toLowerCase ();
		var found = false; 
		
		$.ajax ({
			dataType: "jsonp",
			jsonp: "jsoncallback",
			url: flicker_api_endpoint,
			data: {
				method: 'flickr.interestingness.getList',
				api_key: flicker_api_public_key,
				format: 'json'
			},
			success: function (response) {
				
				// For each photo...
				$.each (response.photos.photo, function (index, photo) {
				
					// Skip searching
					if (found) {
						return;
					}
				
					
					// Retrieve photo id
					var photo_id = photo.id;
					
					
					// Get tags
					$.ajax ({
						dataType: "jsonp",
						jsonp: "jsoncallback",
						url: flicker_api_endpoint,
						data: {
							method: 'flickr.tags.getListPhoto',
							api_key: flicker_api_public_key,
							photo_id: photo_id,
							format: 'json'
						},
						success: function (tags_response) {
							
							$.each (tags_response.photo.tags.tag, function (index, tag) {
							
								console.log (tag.raw.toLowerCase ());
							
								if (tag.raw.toLowerCase () == keyword) {
									found = true;
									alert ('match!');
									return false;
									
								}
							});
							
						}
					});
				});
				
			}
		});
		
		
		// Prevent submit
		return false; 
	});

});

