## Ragam URL Shortner

##### Uses crypto to generate random strings

- Uses only 3 bytes which is okay for ragam CA case. But you might need to increase that depending on the use case.
- As of now, it doesnt check for duplicates

##### Requirements
- NodeJS (v6 and above)
- npm
- MongoDB (local instance of a mongodb server is required if you plan to develop locally).


##### Installation of this service

    //Clone the repo
    git clone https://gitlab.com/edvinbasil/rgm_url
    
    // cd into it
    cd rgm_url
    
    // Install dependencies
    npm i
    
    //Run the server
    node app.js
    
    
##### URL Shortner Usage

To shorten a url, send a POST request to `/api/shortner`
with a json body which has the 'url' field
Example:
    
    curl --request POST \
      --url http://localhost:4000/api/shortner \
      --header 'content-type: application/json' \
      --data '{
    	"url": "https://ragam.org.in"
    }'
    
This will return a response containing the `shortUrl` field.
Goto `/shortUrl` to get redirected back to the original url.