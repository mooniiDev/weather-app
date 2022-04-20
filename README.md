<div id="top"></div>

![aa](https://img.shields.io/badge/Built%20with-🤍-red?style=flat-square)

<div align="center">

  <h1>
    <img alt="Meteo logo" src="https://user-images.githubusercontent.com/51089302/164212893-cfe01441-aa35-4797-9a05-b3ada6a3c222.png" height="50px">
  </h1>

  <p>A weather app that uses the OpenWeather API to display the current weather forecast for a searched location.</p>

  🔗 <b> [Live preview](https://mooniidev.github.io/weather-app/)</b>
</div>

## Table of Contents

- [About the Project](#about-the-project)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Tools](#tools)
  - [Third Party Code](#third-party-code)
- [Build Process](#build-process)
- [Usage](#usage)
- [Outcome](#outcome)
- [Authors](#authors)


## About the Project

Weather forecast site using the [OpenWeather API](https://openweathermap.org/api). The project is from [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/weather-app) curriculum.

### Features

- Ability to search for a specific location
- Possibility to watch the data in metric or imperial systems
- Responsive design

### Technologies

- JavaScript
- CSS
- HTML

### Tools

- Visual Studio Code
- Git and GitHub
- Webpack
- ESLint + Airbnb JavaScript style guide
- Prettier code formatter
- Linux terminal


### Third Party Code

- [date-fns library](https://date-fns.org/)
- [Font Awesome icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

<img alt="Meteo interface" src="https://user-images.githubusercontent.com/51089302/164213570-44464a7b-18bb-4af6-bf65-d0fcab33ef55.png">

<p align="right">⬆️ <a href="#top">Back to top</a></p>

## Build Process

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

1. Clone this repository:
```sh
$ git clone https://github.com/mooniiDev/weather-app.git
```
2. Go to the cloned repository:
```sh
$ cd weather-app
```
3. Install dependencies:
```sh
$ npm install
```
4. Generate an API key at [OpenWeather](https://openweathermap.org/) website.

5. Enter your generated API key in `/src/api.js`:
```js
const API_KEY = 'YOUR API KEY';
```
6. Build the app:
```sh
$ npm run build
```

## Usage
1. Go to the `/dist` location and open `index.html` file with a browser.

<p align="right">⬆️ <a href="#top">Back to top</a></p>

## Outcome

- Used revealing module pattern for code organizing
- Used HTML5 semantic elements for better structure and readability
- Used CSS Grid and CSS Flexbox modules to create a responsive layout
- Cross tested on Firefox and Chromium browsers
- Improved classes naming convention
- Learned to use basic API functionality
- Learned basic error handling
- Learned to use Font Awesome icons in `svg` format

## Authors

[mooniiDev](https://github.com/mooniiDev) | [LinkedIn](https://www.linkedin.com/in/mooniidev/) | mooniidev@proton.me
