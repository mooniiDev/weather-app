import {
  format, addSeconds, fromUnixTime, intervalToDuration,
} from 'date-fns';

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

  function formatDate(timezone, currentUnit) {
    let currentDate;
    if (currentUnit === 'metric') {
      currentDate = format(
        addSeconds(new Date(), timezone),
        'MMMM d, yyyy | EEEE, HH:mm',
      );
    } else {
      currentDate = format(
        addSeconds(new Date(), timezone),
        'MMMM d, yyyy | EEEE, h:mm aa',
      );
    }
    return currentDate;
  }

  function formatTime(timezone, unix, currentUnit) {
    const formattedTimestamp = fromUnixTime(unix);
    let formattedTime;

    if (currentUnit === 'metric') {
      formattedTime = format(
        addSeconds(formattedTimestamp, timezone),
        'HH:mm',
      );
    } else {
      formattedTime = format(
        addSeconds(formattedTimestamp, timezone),
        'h:mm aa',
      );
    }
    return formattedTime;
  }

  function formatDayLength(sunrise, sunset) {
    const dayStart = fromUnixTime(sunrise);
    const dayEnd = fromUnixTime(sunset);
    const difference = intervalToDuration({
      start: dayStart,
      end: dayEnd,
    });
    const { hours } = difference;
    const { minutes } = difference;

    return `${hours}:${minutes}`;
  }

  function showTempUnits(currentUnit) {
    const allTempUnits = document.querySelectorAll('.temp');
    let tempUnit;

    allTempUnits.forEach((unit) => {
      tempUnit = unit;
      if (currentUnit === 'metric') {
        tempUnit.textContent = '°C';
      } else {
        tempUnit.textContent = '°F';
      }
    });
  }

  function showUnits(currentUnit) {
    const buttonText = document.querySelector('.button-text');

    if (currentUnit === 'metric') {
      buttonText.textContent = 'Check in °F';
      showTempUnits('metric');
    } else {
      buttonText.textContent = 'Check in °C';
      showTempUnits('imperial');
    }
  }

  function renderData(weatherData, currentUnit) {
    const cityName = document.querySelector('.heading-city');
    const cityDate = document.querySelector('.heading-city-date');
    const cityTemp = document.querySelector('.data-temp');
    const feelsLikeTemp = document.querySelector('.data-feels-like');
    const descriptionText = document.querySelector('.data-description');
    const descriptionIcon = document.querySelector('.description-icon');
    const sunriseTime = document.querySelector('.sunrise');
    const sunsetTime = document.querySelector('.sunset');
    const dayLength = document.querySelector('.day-length');

    descriptionIcon.textContent = '';
    showUnits(currentUnit);

    if (weatherData.cod) {
      // If error occurs
      mainContent.classList.add('hide');
      showErrorMessage(weatherData.message);
    } else {
      const icon = document.createElement('i');
      const iconClass = renderIcon(weatherData.icon);

      mainContent.classList.remove('hide');
      errorMessage.classList.add('hide');

      cityName.textContent = `${weatherData.name.toUpperCase()},
      ${weatherData.country}`;

      cityDate.textContent = formatDate(weatherData.timezone, currentUnit);

      cityTemp.textContent = Math.round(weatherData.temp);

      feelsLikeTemp.textContent = Math.round(weatherData.feelsLike);

      icon.classList.add('fad', `${iconClass}`, 'fa-fw', 'icon');
      descriptionIcon.appendChild(icon);
      descriptionText.textContent = weatherData.description;

      sunriseTime.textContent = formatTime(
        weatherData.timezone,
        weatherData.sunrise,
        currentUnit,
      );

      sunsetTime.textContent = formatTime(
        weatherData.timezone,
        weatherData.sunset,
        currentUnit,
      );

      dayLength.textContent = formatDayLength(
        weatherData.sunrise,
        weatherData.sunset,
      );
    }
  }
  return {
    renderData,
  };
})();

export default dom;
