const moment = require('moment');

const dom = (() => {
  const errorMessage = document.querySelector('.error-msg');

  function showErrorMsg() {
    const cityNameDiv = document.querySelector('.city-name-heading');

    errorMessage.classList.remove('hide-err');
    errorMessage.textContent = 'City not found.. 🙈';
    cityNameDiv.textContent = '-';
  }

  // DATA RENDERING
  function renderData(weatherData) {
    const cityName = document.querySelector('.city');
    const countryLetters = document.querySelector('.country');
    const dateTimeDiv = document.querySelector('.date-time');

    // IF CLIENT-SIDE ERROR OCCURS - SHOW A MESSAGE
    if (weatherData >= 400 && weatherData <= 499) {
      showErrorMsg();
      // IF NO ERRORS - SHOW WEATHER DATA
    } else {
      const timezone = weatherData.timezone / 60 / 60;
      const formattedDate = moment()
        .utcOffset(timezone)
        .format('MMMM D, YYYY | dddd, H:mm');

      // REMOVE ERROR MESSAGE
      errorMessage.classList.add('hide-err');

      // RENDER CITY NAME
      cityName.textContent = weatherData.name.toUpperCase();
      countryLetters.textContent = weatherData.country;

      // RENDER CURRENT DATE AND TIME
      dateTimeDiv.textContent = formattedDate;
    }
  }
  return {
    renderData,
  };
})();

export default dom;
