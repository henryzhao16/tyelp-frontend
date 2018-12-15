## Project tyelp

## Google API Key
		1. If you do not already have a Google API Key, visit the following website: 
				https://developers.google.com/places/web-service/get-api-key
		2. Click `Get Started` and select all 3 options: Maps, Routes & Places
		3. Finish set up and copy the API key assigned to you. (Needed for config set up)

## Config Set Up
		1. `cp src/config.sample.js src/config.js`
		2. `nano src/config.js` (Or use a different text editor)
		3. Modify the apiBaseUrl using the correct path to the /api folder in back-end.
		4. Modify the googleApiKey constant. 
		5. Make sure useMockApi is set to `false`.
		6. Save and exit

## Run the Environment
		1. `npm install`
		2. `npm start`
