<?php 

/**
 * sample-interesting-photo-api
 *
 * requirements
 * - php >= 5.5
 * - curl
 *
 * @package sample-interesting-photo-api
 */

 
// Autoload
require_once __DIR__ . '/vendor/autoload.php';


// Configuration
define ('FLICKER_API_ENDPOINT', 'https://api.flickr.com/services/rest/');
define ('FLICKER_API_KEY', '9dcf1f2f5c566d293d230fe0a9860ec6');


/**
 * getFlickerInfo
 *
 * @package sample-interesting-photo-api
 */
function getFlickerInfo ($request_data) {
	
	// create curl resource 
	$ch = curl_init(); 
	

	// set url 
	curl_setopt ($ch, CURLOPT_URL, FLICKER_API_ENDPOINT . '?' . http_build_query ($request_data)); 
	
	// return the transfer as a string 
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt ($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
	
	
	// $output contains the output string 
	$output = curl_exec ($ch); 

	// close curl resource to free up system resources 
	curl_close ($ch);   
	
	
	// Return response
	return json_decode ($output, true);

}


// Create app
$app = new Silex\Application ();


// Routing system
// Retrieve TAGs witha a GET query
$app->get ('/{tag}', function ($tag) use ($app) {

	// Perform request
	$request_data = array (
		'method' => 'flickr.photos.search',
		'api_key' => FLICKER_API_KEY,
                'tags' => $app->escape ($tag),
                'sort' => 'interestingness-desc',
                'page' => 1,
		'per_page' => 1,
		'format' => 'json',
		'nojsoncallback' => '?'
	);

	// Retrieve photos
	$interesting_photos = getFlickerInfo ($request_data);


	// Retrieve tags
	foreach ($interesting_photos['photos']['photo'] as $photo) {

		$request_data['method'] = 'flickr.photos.getSizes';
                $request_data['photo_id'] = $photo['id'];
		$sizes_response = getFlickerInfo ($request_data);

		$image = null;
		foreach ($sizes_response['sizes']['size'] as $index => $size) {
			if ($size['label'] == 'Original') {
				$image = $size;
			}
		}
		
		if ( ! $image) {
			$image = end ($sizes_response['sizes']['size']);
		}
		
		
		// Move the image
		echo json_encode (array ('url' => $image['source']));
		die ();

	}
	
	
	// No found? a 404 header
	header ($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found", true, 404);
	die ();

});

$app->run();
