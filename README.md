# farmers_market_api


## Getting Started
This repo contains the backend server for the FarmStan app.

This is part of the third project for General Assembly's Software Engineering Intensive Course

## Contributors

#### [Charles Desiderio](https://www.github.com)
#### [Spencer Haugh](https://www.github.com)
#### [Aaron Luing](https://www.github.com)
#### [Dan Seiders](https://www.github.com)

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