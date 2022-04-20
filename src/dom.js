import {
  format, addSeconds, fromUnixTime, intervalToDuration,
} from 'date-fns';

const dom = (() => {
  const message = document.querySelector('.message');
  const mainContent = document.querySelector('.main');

  function showMessage(state, error) { // Show loading and error messages
    message.classList.remove('hide');

    if (state === 'loading') {
      message.classList.remove('error');
      message.textContent = 'Loading...';
      mainContent.classList.add('hide');
    } else if (state === 'error') {
      message.classList.add('error');
      message.textContent = `${
        error.charAt(0).toUpperCase() + error.slice(1)
      }.. 🙊`;
      mainContent.classList.add('hide');
    }
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
      case '13d':
      case '13n':
        return 'fa-cloud-snow'; // Snow at day or at night
      case '50d':
      case '50n':
        return 'fa-fog'; // Mist at day or at night
      default:
    }
    return false;
  }

  function getLocalTimezone() {
    const currentDate = new Date();
    const localTimezone = currentDate.getTimezoneOffset() * 60;

    return localTimezone;
  }

  function formatDate(timezone, currentUnit) {
    let formattedDate;
    const currentDate = new Date();

    if (currentUnit === 'metric') {
      formattedDate = format(
        addSeconds(currentDate, timezone + getLocalTimezone()),
        'MMMM d, yyyy | EEEE, HH:mm',
      );
    } else {
      formattedDate = format(
        addSeconds(currentDate, timezone + getLocalTimezone()),
        'MMMM d, yyyy | EEEE, h:mm aa',
      );
    }
    return formattedDate;
  }

  function formatTime(timezone, unix, currentUnit) {
    const formattedTimestamp = fromUnixTime(unix + (timezone + getLocalTimezone()));
    let formattedTime;

    if (currentUnit === 'metric') {
      formattedTime = format(
        formattedTimestamp,
        'HH:mm',
      );
    } else {
      formattedTime = format(
        formattedTimestamp,
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
    let formattedHours = hours.toString();
    let formattedMinutes = minutes.toString();

    if (formattedHours >= 0 && formattedHours <= 9) {
      formattedHours = `0${formattedHours}`;
    } else if (formattedMinutes >= 0 && formattedMinutes <= 9) {
      formattedMinutes = `0${formattedMinutes}`;
    }
    return `${formattedHours}:${formattedMinutes}`;
  }

  function formatWindDirection(deg) {
    let direction;

    if ((deg >= 0 && deg <= 22.5)
    || (deg > 337.5 && deg <= 360)) {
      direction = 'North';
    } else if (deg >= 22.5 && deg <= 67.5) {
      direction = 'Northeast';
    } else if (deg >= 67.5 && deg <= 112.5) {
      direction = 'East';
    } else if (deg >= 112.5 && deg <= 157.5) {
      direction = 'Southeast';
    } else if (deg >= 157.5 && deg <= 202.5) {
      direction = 'South';
    } else if (deg >= 202.5 && deg <= 247.5) {
      direction = 'Southwest';
    } else if (deg >= 247.5 && deg <= 292.5) {
      direction = 'West';
    } else if (deg >= 292.5 && deg <= 337.5) {
      direction = 'Northwest';
    }
    return direction;
  }

  function changeTempUnits(currentUnit) {
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
    const speedUnit = document.querySelector('.speed');

    if (currentUnit === 'metric') {
      buttonText.textContent = 'Check in °F';
      changeTempUnits('metric');
      speedUnit.textContent = 'm/s';
    } else {
      buttonText.textContent = 'Check in °C';
      changeTempUnits('imperial');
      speedUnit.textContent = 'mph';
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
    const pressure = document.querySelector('.data-pressure');
    const humidity = document.querySelector('.data-humidity');
    const visibility = document.querySelector('.data-visibility');
    const cloudiness = document.querySelector('.data-cloudiness');
    const windSpeed = document.querySelector('.data-speed');
    const windDirection = document.querySelector('.data-direction');

    descriptionIcon.textContent = '';
    showUnits(currentUnit);

    if (weatherData.cod) { // If error occurs
      showMessage('error', weatherData.message);
    } else {
      const icon = document.createElement('i');
      const iconClass = renderIcon(weatherData.icon);

      mainContent.classList.remove('hide');
      message.classList.add('hide');

      cityName.textContent = `${weatherData.name.toUpperCase()},
      ${weatherData.country}`;

      cityDate.textContent = formatDate(weatherData.timezone, currentUnit, weatherData.name);

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

      pressure.textContent = `${weatherData.pressure}hPa`;

      humidity.textContent = `${weatherData.humidity}%`;

      visibility.textContent = `${weatherData.visibility}m`;

      cloudiness.textContent = `${weatherData.cloudiness}%`;

      windSpeed.textContent = Math.round(weatherData.windSpeed);

      windDirection.textContent = formatWindDirection(weatherData.windDeg);
    }
  }
  return {
    showMessage,
    renderData,
  };
})();

export default dom;
