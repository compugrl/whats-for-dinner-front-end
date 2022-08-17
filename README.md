# What's For Dinner? - A menu planning app
## Overview 

Users can search for recipes by ingredient with optional filters for excluded ingredient, max number of ingredients, max minutes to prepare, or cuisine.  
This app was written in **React Native** as a Capstone Project at [Ada Developers Academy](https://adadevelopersacademy.org/).

### PUBLISHED APP LINK with [QR CODE](https://expo.dev/@compugrl/whats-for-dinner-front-end) 
<img src="/assets/screens/Splash.png" alt="Welcome" width="250" height="500">.  <img src="/assets/screens/Home.png" alt="Home" width="250" height="500">. <img src="/assets/screens/Search.png" alt="Search" width="250" height="500">.  <img src="/assets/screens/Faves.png" alt="Favorites" width="250" height="500">.  <img src="/assets/screens/ShoppingList.png" alt="Shopping List" width="250" height="500">. <img src="/assets/screens/RecipeMain.png" alt="Main Recipe" width="250" height="500">. <img src="/assets/screens/ViewRecipe.png" alt="View Recipe" width="250" height="500">. <img src="/assets/screens/ShopIngredients.png" alt="Shop Ingredients" width="250" height="500">. <img src="/assets/screens/Share.png" alt="Share" width="250" height="500">. <img src="/assets/screens/AddFavorite.png" alt="Add to Favorites" width="250" height="500">. <img src="/assets/screens/AddToMenu.png" alt="Add to Menu" width="250" height="500"> 

## App Features

- **Tappable Calendar** on Home screen for seeing recipes for selected date + 7 days.
- Recipes are sourced from an external [**API**](https://api.edamam.com/api/recipes/v2) deployed [here](https://wfd-back-end.herokuapp.com/search).


## Requirements
- Node.js - this is needed in order to access the Node Package Manager (npm).


## Installation/Environment Set-Up

- Clone this repository.
- Install the Expo Command Line Interface by running `npm install -g expo-cli`.
- Install dependencies by running `npm install`.
- To test the app on your local machine:
  - To test on an iPhone Simulator
    - Download [XCode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) and follow instructions.
  - To test on an Android Emulator 
    - Download [Android Studio](https://developer.android.com/studio) and follow instructions.
- The database is in PostgreSQL and is already created and configured on the deployed back-end [here](https://wfd-back-end.herokuapp.com).
- To start the server run `npm start` or `expo start`.  These commands are interchangeable.
- Currently, the code to create a new user in the database has not been tested and confirmed to work. You can use the app by logging in with the **email** `test@wfd-test.com` and **password** `I^mtesting` 