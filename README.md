# interesting-photo
Sample REST application for the signature Distributed System. 

It uses Silex framework only for test purposes. For the simplicity of the application a Framework wouldn't be necessary.

## Webpage
https://smolky.github.io/interesting-photo/

## Requirements
1. PHP >= 5.5
2. cURL extension
3. Composer installed globally (https://semaphoreci.com/community/tutorials/getting-started-with-composer-for-php-dependency-management)

*TIP:* You can use something like https://box.scotch.io/ to get a Vagrant Virtual Machine (Vagrant) with similar requirements.

## How to install
1. Clone the repository or download on your server
2. Install dependecies
```
> composer install
```
3. Configure js/main.js file updating api_endpoint variable for your endpoint like (http://localhost/insteresting-photo/api/)
4. Open in a browser your project


## Things to do
- @todo Add itemsperpage or paginate results on interestingness
- @todo Alternative mode https://www.flickr.com/services/api/flickr.photos.search.html
- @todo Get the largest photo found
