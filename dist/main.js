/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst api = (() => {\n  // PROCESS WEATHER DATA\n  async function processData(weatherData) {\n    const processedData = {\n      name: weatherData.name,\n      country: weatherData.sys.country,\n      dataCalcTime: weatherData.dt,\n      description: weatherData.weather[0].description,\n      weatherIcon: weatherData.weather[0].icon,\n      temp: weatherData.main.temp,\n      feelsLike: weatherData.main.feels_like,\n      pressure: weatherData.main.pressure,\n      humidity: weatherData.main.humidity,\n      visibility: weatherData.visibility,\n      windSpeed: weatherData.wind.speed,\n      windGust: weatherData.wind.gust,\n      windDeg: weatherData.wind.deg,\n      sunrise: weatherData.sys.sunrise,\n      sunset: weatherData.sys.sunset,\n    };\n    return processedData;\n  }\n\n  // GET WEATHER DATA FROM API\n  async function getData(city, unit) {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=0baf2fc9b70638f2b2157bf4fe3efde1`,\n        { mode: 'cors' },\n      );\n\n      let data = await response.json();\n\n      // IF ERROR OCCURS\n      if (response.status >= 400) {\n        data = response.status;\n        return data;\n      }\n      return processData(data);\n    } catch (err) {\n      return err.message;\n    }\n  }\n  return {\n    getData,\n    processData,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = (() => {\n  const errorMessage = document.querySelector('.error-msg');\n\n  function showCityName(name, country) {\n    const cityName = document.querySelector('.city');\n    const countryLetters = document.querySelector('.country');\n\n    cityName.textContent = name.toUpperCase();\n    countryLetters.textContent = country;\n  }\n\n  function showErrorMsg(error) {\n    const cityNameDiv = document.querySelector('.city-name-heading');\n\n    // IF ERROR IS CLIENT-SIDE\n    if (error === 'client') {\n      errorMessage.textContent = 'Client error response!';\n      // IF ERROR IS SERVER-SIDE\n    } else if (error === 'server') {\n      errorMessage.textContent = 'Server error response!';\n    }\n    errorMessage.classList.remove('hide-err');\n    cityNameDiv.textContent = '-';\n  }\n\n  function renderData(weatherData) {\n    // IF ERROR OCCURS - SHOW A MESSAGE\n    if (weatherData >= 400 && weatherData <= 499) {\n      showErrorMsg('client');\n    } else if (weatherData >= 500 && weatherData <= 599) {\n      showErrorMsg('server');\n\n      // IF NO ERRORS - SHOW WEATHER DATA\n    } else {\n      errorMessage.classList.add('hide-err');\n      // CITY NAME\n      showCityName(weatherData.name, weatherData.country);\n    }\n  }\n  return {\n    renderData,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://weather-app/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n// GET AND SHOW DEFAULT WEATHER DATA\nasync function getDefaultData() {\n  const weatherData = await _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getData('Amsterdam', 'metric');\n  _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderData(weatherData);\n  return weatherData;\n}\ngetDefaultData();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;