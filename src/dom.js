const moment = require('moment');

const dom = (() => {
  const errorMessage = document.querySelector('.error-msg');
  const main = document.querySelector('#main');

  function showErrorMsg(msg) {
    main.classList.add('hide');
    errorMessage.classList.remove('hide');
    errorMessage.textContent = `${
      msg.charAt(0).toUpperCase() + msg.slice(1)
    }.. 🙊`;
  }

  function formatDate(timezone) {
    const offset = timezone / 60 / 60;
    const formattedDate = moment()
      .utcOffset(offset)
      .format('MMMM D, YYYY | dddd, H:mm');
    return formattedDate;
  }

  // DATA RENDERING
  function renderData(weatherData) {
    const dateTimeDiv = document.querySelector('.date-time');
    const cityName = document.querySelector('.city-name-heading');

    // IF ERROR OCCURS - HIDE MAIN CONTENT AND SHOW ERROR MESSAGE
    if (weatherData.cod) {
      main.classList.add('hide');
      showErrorMsg(weatherData.message);

      // SHOW MAIN CONTENT AND REMOVE ERROR MESSAGE
    } else {
      main.classList.remove('hide');
      errorMessage.classList.add('hide');

      // RENDER CITY NAME
      cityName.textContent = `${weatherData.name.toUpperCase()}, ${
        weatherData.country
      }`;

      // RENDER CURRENT DATE AND TIME
      dateTimeDiv.textContent = formatDate(weatherData.timezone);
    }
  }
  return {
    renderData,
  };
})();

export default dom;
