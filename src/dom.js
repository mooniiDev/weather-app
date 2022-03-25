const moment = require('moment');

const dom = (() => {
  const errorMessage = document.querySelector('.search-error');
  const mainContent = document.querySelector('.main');

  function showErrorMessage(message) {
    mainContent.classList.add('hide');
    errorMessage.classList.remove('hide');
    errorMessage.textContent = `${
      message.charAt(0).toUpperCase() + message.slice(1)
    }.. 🙊`;
  }

  function formatDate(timezone) {
    const offset = timezone / 60 / 60;
    const formattedDate = moment()
      .utcOffset(offset)
      .format('MMMM D, YYYY | dddd, H:mm');
    return formattedDate;
  }

  function renderData(weatherData) {
    const cityDate = document.querySelector('.heading-city-date');
    const cityName = document.querySelector('.heading-city');

    // IF ERROR OCCURS
    if (weatherData.cod) {
      mainContent.classList.add('hide');
      showErrorMessage(weatherData.message);
    } else {
      mainContent.classList.remove('hide');
      errorMessage.classList.add('hide');

      cityName.textContent = `${weatherData.name.toUpperCase()},
      ${weatherData.country}`;
      cityDate.textContent = formatDate(weatherData.timezone);
    }
  }
  return {
    renderData,
  };
})();

export default dom;
