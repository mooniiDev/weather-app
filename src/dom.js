const moment = require('moment');

const dom = (() => {
  const errorMessage = document.querySelector('.error-msg');

  function showErrorMsg() {
    errorMessage.classList.remove('hide-err');
    errorMessage.textContent = 'City not found.. 🙈';
  }

  function formatDate(timezone) {
    const offset = timezone / 60 / 60;
    const formattedDate = moment()
      .utcOffset(offset)
      .format('MMMM D, YYYY | dddd, HH:mm');
    return formattedDate;
  }

  // DATA RENDERING
  function renderData(weatherData) {
    const dateTimeDiv = document.querySelector('.date-time');

    // IF CLIENT-SIDE ERROR OCCURS - SHOW A MESSAGE
    if (weatherData >= 400 && weatherData <= 499) {
      showErrorMsg();
      // IF NO ERRORS - SHOW WEATHER DATA
    } else {
      // REMOVE ERROR MESSAGE
      errorMessage.classList.add('hide-err');

      // RENDER CITY NAME
      const cityName = document.querySelector('.city-name-heading');
      cityName.textContent = `${weatherData.name.toUpperCase()}, ${weatherData.country}`;

      // RENDER CURRENT DATE AND TIME
      dateTimeDiv.textContent = formatDate(weatherData.timezone);
    }
  }
  return {
    renderData,
  };
})();

export default dom;
