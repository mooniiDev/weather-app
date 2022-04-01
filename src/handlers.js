import api from './api';
import dom from './dom';

const handlers = (() => {
  function listenClicks() {
    const contentWrapper = document.querySelector('#wrapper');

    contentWrapper.addEventListener('click', async (event) => {
      const { target } = event;

      event.preventDefault();
      if (
        target.classList.contains('search-button')
        || target.parentElement.parentElement.classList.contains('search-button')
      ) {
        const searchInputValue = document.querySelector('.search-input').value;
        const weatherData = await api.getData(searchInputValue, 'metric');
        dom.renderData(weatherData);

        // BUTTON TO CHANGE UNITS OF MEASUREMENT
      } else if (target.classList.contains('button')
        || target.parentElement.parentElement.classList.contains('button')) {
        const currentTempUnit = document.querySelector('.unit-temp');
        dom.changeUnit(currentTempUnit.textContent);
      }
    });
  }
  return {
    listenClicks,
  };
})();

export default handlers;
