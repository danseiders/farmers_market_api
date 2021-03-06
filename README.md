# farmers_market_api


## Getting Started
This repo contains the backend server for the FarmStan app.

This is part of the third project for General Assembly's Software Engineering Intensive Course

## Contributors

#### [Charles Desiderio](https://github.com/CharlesDesiderio)
#### [Spencer Haugh](https://github.com/spencerhaugh)
#### [Aaron Luing](https://github.com/AaronLuing)
#### [Dan Seiders](https://github.com/danseiders)

## Code Overview

### Dependencies
`expressjs` - Server and route handling
`jsonwebtoken` - Used for handling user authentication and generating tokens to verify user identity

`mongoose` - Used for modeling database schema and connecting to MongoDB for storage

`bcrypt` - Used for encrypting and checking user passwords on login, user creation and user updating

### Application Structure

`server.js` - This is the server entry point and defines the routes for the controllers and Mongoose DB connection 

`/controllers` - This folder contains the route data for each model

`/models` - This folder contains the Mongo database schema

### Authentication

This app uses `JSON Web Tokens` to verify user identity.

### Links

[Live Site](http://farm-stan-client.herokuapp.com/)

[Client Repo](https://github.com/danseiders/farmers_market_client)

[Server Repo](https://github.com/danseiders/farmers_market_api)