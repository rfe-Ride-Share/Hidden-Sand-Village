# vROOm

A mobile-first rideshare app where people can post trips they're taking, request to join trips posted by others, manage riders on their trips, and communicate with other riders to plan the details of their road trips. The goal of vROOm is to create a place where anyone can share their trips so that we can reduce the impact on the environment of car travel and increase the impact of human connection.


![2022-08-31 12 38 24](https://user-images.githubusercontent.com/98896929/187733739-ca6379a4-d421-4107-bcaa-716308c6d06f.gif)

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![ESLint](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Nodemon](https://img.shields.io/badge/-Nodemon-76D04B?logo=nodemon&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Auth0](https://img.shields.io/badge/-Auth0-c9cace?logo=auth0&logoColor=black&style=for-the-badge)
![Google Maps](https://img.shields.io/badge/Google_Maps-D14836?style=for-the-badge&logo=googlemaps&logoColor=white)
![Socket](https://img.shields.io/badge/socket.io-25c2a0?style=for-the-badge&logo=socket.io&logoColor=black)

## Mockup & Flow Diagram
<img width="100%" alt="Figma Diagram" src="https://user-images.githubusercontent.com/98896929/188232171-eabcc8d8-93f6-49ba-a8e8-c048a96ee49a.png">

## Features


1. User Authentication
2. Search: Users can search for trips by...

- Destination
- Start Point


3. Create Trips: User can add trips...

- Start Point
- Destination
- Trip Title
- Departure Date & Time
- Number of Passengers
- Trip Description

4. My Trips: Users can manage their trips...

- Request to join a trip from the home page after clicking on a trip
- Accept or reject riders' requests to join
- Remove riders from a trip
- Cancel your participation in a trip if you are a rider
- Cancel the whole trip if you are a driver
- Review other users after a trip is finished
- Pay the driver an equal share of the cost via Paypal or Venmo

5. Message: Users can send messages to other users

## Getting Started
### Setup

1. Clone down the repo
   ```
   git clone https://github.com/rfe-Ride-Share/Hidden-Sand-Village
   ```
2. Install dependencies
   ```
   npm install
   ```
3. To prepare client-side code
   ```
   npm run client-dev
   ```
4. To start the server (in a separate terminal window)
   ```
   npm run server-dev
   ```
5. Open up a browser window and navigate to this url
   ```
   http://localhost:3000/
   ```
6. Open up chrome dev tools and change the viewport to iPhone SE 📱

### Environment Variables
```
//MAPS
GMAPS_API_KEY='yourGoogleMapsAPIKey'

//AUTH0
ISSUER_BASE_URL=https://baseurlfromauth0.us.auth0.com
CLIENT_ID=clientIDfromAuth0
BASE_URL=http://localhost:3000
CALLBACK_URL=http://localhost:3000/callback
SECRET=yourSecretFromAuth0

//DB
MONGO=mongodb+srv://username:password@mongodb.net/db
```


## Contributors

The whole team worked as fullstack engineers to create vROOm but we also had these additional roles:

Product Managers
[Ian Zuber](https://github.com/ianzuber221) & [Rikki Zhang](https://github.com/llz08)

Architects
[Anthony Cella](https://github.com/anthonycella) & [Junyuh Suh](https://github.com/galopyz)

UI/UX
[Brandon Hester](https://github.com/brandon-hester) & [Michael Schoenecker](https://github.com/noginger13)

Chat
[Cheyenne Cornett](https://github.com/Cheyennecornett)


