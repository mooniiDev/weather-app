const moment = require('moment');

const dom = (() => {
  const errorMessage = document.querySelector('.error-msg');
  const main = document.querySelector('#main');

  function showErrorMsg(msg) {
    errorMessage.classList.remove('hide');
    errorMessage.textContent = `${msg.charAt(0).toUpperCase() + msg.slice(1)}.. 🙊`;
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
    const cityName = document.querySelector('.city-name-heading');
    const currentTempPar = document.querySelector('.current-temp');
    const currentTemp = Math.round(weatherData.temp);

    // IF CLIENT-SIDE ERROR OCCURS - HIDE MAIN CONTENT AND SHOW ERROR MESSAGE
    if (weatherData.cod) {
      main.classList.add('hide');
      showErrorMsg(weatherData.message);
    } else {
      // SHOW MAIN CONTENT AND REMOVE ERROR MESSAGE
      main.classList.remove('hide');
      errorMessage.classList.add('hide');

      // RENDER CITY NAME
      cityName.textContent = `${weatherData.name.toUpperCase()}, ${weatherData.country}`;

      // RENDER CURRENT DATE AND TIME
      dateTimeDiv.textContent = formatDate(weatherData.timezone);

      // RENDER CURRENT TEMPERATURE (IN CELCIUS)
      currentTempPar.textContent = `${currentTemp}°C`;
    }
  }
  return {
    renderData,
  };
})();

export default dom;
