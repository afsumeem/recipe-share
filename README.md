
# Recipe Share
https://recipeshare-ivory.vercel.app/
## Overview
The Recipe Sharing System is a full-stack application built using React.js for the front end, MongoDB and Express.js for the back end, and Firebase for authentication. This application allows users to view and share recipes, register and log in using Google authentication, and manage their virtual coins to access detailed recipes.

## Features
- **View Recipes**: Users can browse through the available recipes.
- **Google Authentication**: Register and log in using Google. New users receive 50 coins upon registration.
- **Recipe Details**: Viewing detailed recipes costs 10 coins.
- **Purchase Coins**: Users can buy coins in packages of 100, 500, or 1000 for 1, 5, or 10 dollars respectively.
- **Add Recipes**: Users can add new recipes and earn 1 coin for each view of their recipes.

## Project Layout
- **Navbar**: Displays website name/logo and navigation links that change based on user login status.
  - Before Login: Home, Recipes, Google Login
  - After Login: Home, Recipes, Add Recipes, Coins + User Image + Logout
- **Home Page**: Includes an attractive banner, success stories, and developer info.
  - **Banner**: Features a slogan with buttons to see recipes and add recipes.
  - **Success Stories**: Displays recipe and user counts.
  - **Developer Info**: Provides information about the developer’s background and experience.
- **Footer**: Contains links to the developer's social profiles.

## Setup Instructions

1. **Clone the Repository**
    ```bash
    git clone https://github.com/afsumeem/recipe-share.git
    cd recipe-share
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Development Server**
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:3000](http://localhost:3000).
