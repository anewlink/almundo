# almundo
Current version of the app is not working but these are the run steps:

1. Open a console window and set the path to the root folder of this app (almundo)
2. In console execute the command: npm install
3. To run the database execute: npm run backend:
   - At http://localhost:3000/hotels you can get the hotel list.
   - At http://localhost:3000/hotels/id an specific hotel
4. This step is not fully working. To Generate a sigle js file, for the site, using minification, uglify and several task run the following commands:
   - npm run build-prod: contains minimize and uglify and hide source maps for debugging
   - npm run build-dev: doens't contains uglify and does show source maps

Additional commands:
   - npm run test: to run js linter.

