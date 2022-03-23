import api from './api';
import dom from './dom';

const handlers = (() => {
  function listenClicks() {
    const body = document.querySelector('body');

    body.addEventListener('click', async (event) => {
      const { target } = event;

      event.preventDefault();

      if (
        target.classList.contains('search-btn')
        || target.classList.contains('fa-primary')
        || target.classList.contains('fa-secondary')
      ) {
        const searchInputValue = document.querySelector('.search-input').value;
        const weatherData = await api.getData(searchInputValue, 'metric');
        dom.renderData(weatherData);
      }
    });
  }
  return {
    listenClicks,
  };
})();

export default handlers;
