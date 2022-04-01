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

  function renderIcon(iconID) {
    switch (iconID) {
      case '01d':
        return 'fa-sun'; // Clear sky at day
      case '01n':
        return 'fa-moon-stars'; // Clear sky at night
      case '02d':
        return 'fa-sun-cloud'; // Few clouds at day
      case '02n':
        return 'fa-moon-cloud'; // Few clouds at night
      case '03d':
        return 'fa-clouds-sun'; // Scattered clouds at day
      case '03n':
        return 'fa-clouds-moon'; // Scattered clouds at night
      case '04d':
      case '04n':
        return 'fa-clouds'; // Overcast clouds at day or at night
      case '09d':
      case '09n':
        return 'fa-cloud-showers-heavy'; // Shower rain at day or at night
      case '10d':
      case '10n':
        return 'fa-cloud-showers'; // Rain at day or at night
      case '11d':
        return 'fa-thunderstorm-sun'; // Thunderstorm at day
      case '11n':
        return 'fa-thunderstorm-moon'; // Thunderstorm at night
      case '12d':
      case '12n':
        return 'fa-cloud-snow'; // Snow at day or at night
      case '50d':
      case '50n':
        return 'fa-fog'; // Mist at day or at night
      default:
    }
    return false;
  }

  function changeUnit(currentTempUnit) {
    const allTempUnits = document.querySelectorAll('.current-temp-unit');
    const changeUnitButton = document.querySelector('.button-text');
    allTempUnits.forEach((unit) => {
      const changedTempUnit = unit;
      if (currentTempUnit === '°C') {
        changedTempUnit.textContent = '°F';
        changeUnitButton.textContent = 'Check in °C';
      } else {
        changedTempUnit.textContent = '°C';
        changeUnitButton.textContent = 'Check in °F';
      }
    });
  }

  function renderData(weatherData) {
    const cityDate = document.querySelector('.heading-city-date');
    const cityName = document.querySelector('.heading-city');
    const cityTemp = document.querySelector('.data-temp');
    const feelsLikeTemp = document.querySelector('.data-feels-like');
    const descriptionText = document.querySelector('.description-text');
    const descriptionIcon = document.querySelector('.description-icon');
    descriptionIcon.textContent = '';

    // IF ERROR OCCURS
    if (weatherData.cod) {
      mainContent.classList.add('hide');
      showErrorMessage(weatherData.message);
    } else {
      const icon = document.createElement('i');
      const iconClass = renderIcon(weatherData.icon);
      mainContent.classList.remove('hide');
      errorMessage.classList.add('hide');

      cityName.textContent = `${weatherData.name.toUpperCase()},
      ${weatherData.country}`;
      cityDate.textContent = formatDate(weatherData.timezone);

      cityTemp.textContent = Math.round(weatherData.temp);
      feelsLikeTemp.textContent = Math.round(weatherData.feelsLike);

      icon.classList.add('fad', `${iconClass}`, 'fa-fw', 'icon');
      descriptionIcon.appendChild(icon);
      descriptionText.textContent = weatherData.description;
    }
  }
  return {
    changeUnit,
    renderData,
  };
})();

export default dom;
