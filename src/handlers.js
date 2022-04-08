import api from './api';
import dom from './dom';

const handlers = (() => {
  async function loadData(city, unit) {
    const weatherData = await api.getData(city, unit);
    dom.renderData(weatherData, unit);
  }

  function listenClicks() {
    const contentWrapper = document.querySelector('#wrapper');
    let searchInputValue = 'Amsterdam';
    let unit = 'metric';

    contentWrapper.addEventListener('click', (event) => {
      const { target } = event;

      event.preventDefault();

      // BUTTON TO SEARCH FOR A CITY
      if (
        target.classList.contains('search-button')
        || target.parentElement.parentElement.classList.contains('search-button')
      ) {
        searchInputValue = document.querySelector('.search-input').value;
        loadData(searchInputValue, unit);

        // BUTTON TO CHANGE UNITS OF MEASUREMENT
      } else if (target.classList.contains('change-button')
        || target.parentElement.parentElement.classList.contains('change-button')) {
        if (unit === 'metric') {
          unit = 'imperial';
          loadData(searchInputValue, unit);
        } else {
          unit = 'metric';
          loadData(searchInputValue, unit);
        }
      }
    });
  }
  return {
    listenClicks,
  };
})();

export default handlers;
