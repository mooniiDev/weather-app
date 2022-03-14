const dom = (() => {
  const errorMessage = document.querySelector('.error-msg');

  function showCityName(name, country) {
    const cityName = document.querySelector('.city');
    const countryLetters = document.querySelector('.country');

    cityName.textContent = name.toUpperCase();
    countryLetters.textContent = country;
  }

  function showErrorMsg(error) {
    const cityNameDiv = document.querySelector('.city-name-heading');

    // IF ERROR IS CLIENT-SIDE
    if (error === 'client') {
      errorMessage.textContent = 'Client error response!';
      // IF ERROR IS SERVER-SIDE
    } else if (error === 'server') {
      errorMessage.textContent = 'Server error response!';
    }
    errorMessage.classList.remove('hide-err');
    cityNameDiv.textContent = '-';
  }

  function renderData(weatherData) {
    // IF ERROR OCCURS - SHOW A MESSAGE
    if (weatherData >= 400 && weatherData <= 499) {
      showErrorMsg('client');
    } else if (weatherData >= 500 && weatherData <= 599) {
      showErrorMsg('server');

      // IF NO ERRORS - SHOW WEATHER DATA
    } else {
      errorMessage.classList.add('hide-err');
      // CITY NAME
      showCityName(weatherData.name, weatherData.country);
    }
  }
  return {
    renderData,
  };
})();

export default dom;
